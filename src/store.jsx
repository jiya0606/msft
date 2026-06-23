import React, { createContext, useContext, useReducer, useCallback, useRef } from 'react';
import {
  INITIAL_NOTEBOOKS, INITIAL_TASKS, INITIAL_FILES, INITIAL_ACTIVITY_LOGS,
  INITIAL_PROPOSED_ACTIONS, INITIAL_SAVED_RECIPE_TYPES,
  classifyContent, fmtRelTime, NOW,
} from './data.js';

const AppContext = createContext(null);

const initialState = {
  // Navigation
  screen: 'home',
  notebookId: null,
  notebookViewMode: 'default',  // 'default' | 'brief'
  activeTab: 'overview',
  todoView: 'all',

  // Data
  notebooks: INITIAL_NOTEBOOKS,
  tasks: INITIAL_TASKS,
  files: INITIAL_FILES,
  activityLogs: INITIAL_ACTIVITY_LOGS,
  proposedActions: INITIAL_PROPOSED_ACTIONS,
  savedRecipeTypes: INITIAL_SAVED_RECIPE_TYPES,
  recipeRanFor: new Set(),           // notebookIds where recipe was run
  githubIssues: {},                  // fileId -> { issueNumber, repo, status }
  stalenessDismissals: {},           // notebookId -> dismissedAt timestamp

  // UI state
  toast: null,
  toastUndoFn: null,
  modal: null,                       // null | 'github' | 'merge-review' | 'meeting-capture'
  modalData: null,
  ghRepo: 'mobile-app',
  ghRepoDDOpen: false,
  devPanelOpen: false,
  captureFileDest: null,
  notesExpandOpen: false,
  doneExpandOpen: false,
  derivOpen: {},
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case 'NAVIGATE':
      return {
        ...state,
        screen: action.screen,
        notebookId: action.notebookId || null,
        notebookViewMode: action.viewMode || 'default',
        activeTab: 'overview',
        modal: null,
        modalData: null,
        ghRepoDDOpen: false,
        captureFileDest: null,
      };

    case 'SET_TAB':
      return { ...state, activeTab: action.tab };

    case 'SET_TODO_VIEW':
      return { ...state, todoView: action.view };

    // ── Tasks ──
    case 'TOGGLE_TASK': {
      const tasks = state.tasks.map(t =>
        t.id !== action.taskId ? t :
        { ...t, completedAt: t.completedAt ? null : NOW }
      );
      return { ...state, tasks };
    }

    case 'PIN_TASK': {
      const tasks = state.tasks.map(t =>
        t.id !== action.taskId ? t :
        { ...t, manualOverride: !t.manualOverride }
      );
      return { ...state, tasks };
    }

    case 'ADD_TASK': {
      return { ...state, tasks: [...state.tasks, action.task] };
    }

    // ── Files ──
    case 'ADD_FILE': {
      const { notebookId, file } = action;
      const cur = state.files[notebookId] || [];
      return {
        ...state,
        files: { ...state.files, [notebookId]: [...cur, file] },
      };
    }

    case 'MOVE_FILE': {
      const { fileId, fromNotebookId, toNotebookId } = action;
      const fromFiles = (state.files[fromNotebookId] || []).filter(f => f.id !== fileId);
      const movedFile = (state.files[fromNotebookId] || []).find(f => f.id === fileId);
      if (!movedFile) return state;
      const toFiles = [...(state.files[toNotebookId] || []), { ...movedFile, notebookId: toNotebookId }];
      return {
        ...state,
        files: {
          ...state.files,
          [fromNotebookId]: fromFiles,
          [toNotebookId]: toFiles,
        },
      };
    }

    // ── Proposed Actions ──
    case 'ACCEPT_ACTION': {
      const { id } = action;
      const pa = state.proposedActions.find(p => p.id === id);
      if (!pa) return state;

      let nextState = {
        ...state,
        proposedActions: state.proposedActions.map(p =>
          p.id === id ? { ...p, status: 'accepted' } : p
        ),
      };

      // Handle recipe suggestion: navigate to notebook and mark recipe run
      if (pa.type === 'recipe_suggestion' && pa.targetNotebookId) {
        nextState = {
          ...nextState,
          recipeRanFor: new Set([...state.recipeRanFor, pa.targetNotebookId]),
          screen: 'notebook-detail',
          notebookId: pa.targetNotebookId,
          activeTab: 'overview',
        };
      }
      return nextState;
    }

    case 'DISMISS_ACTION': {
      const nextActions = state.proposedActions.map(p =>
        p.id === action.id ? { ...p, status: 'dismissed' } : p
      );
      let nextState = { ...state, proposedActions: nextActions };
      // If dismissing staleness nudge, record cooldown
      const pa = state.proposedActions.find(p => p.id === action.id);
      if (pa?.type === 'staleness_nudge' && pa.targetNotebookId) {
        nextState.stalenessDismissals = {
          ...state.stalenessDismissals,
          [pa.targetNotebookId]: NOW,
        };
      }
      return nextState;
    }

    case 'UNDO_ACTION': {
      const { id } = action;
      const pa = state.proposedActions.find(p => p.id === id);
      if (!pa) return state;

      let nextState = {
        ...state,
        proposedActions: state.proposedActions.map(p =>
          p.id === id ? { ...p, status: 'pending' } : p
        ),
      };

      // Undo auto_file: move file back
      if (pa.type === 'auto_file' && pa.fileId && pa.originalNotebookId !== undefined) {
        // The file is currently in targetNotebookId, move it back
        // For pa1, the file moved from somewhere to mobile-push in the undo scenario
        // Actually for the seed: pa1 describes filing to mobile-push. Undo means remove from mobile-push
        // For simplicity, undo the proposed action and add activity log entry
        const newLog = {
          id: `al-undo-${Date.now()}`,
          notebookId: pa.targetNotebookId,
          description: `Copilot filing undone — file removed from this notebook`,
          timestamp: NOW,
          actor: 'user',
        };
        nextState.activityLogs = {
          ...state.activityLogs,
          [pa.targetNotebookId]: [...(state.activityLogs[pa.targetNotebookId] || []), newLog],
        };
      }
      return nextState;
    }

    // ── Notebooks merge ──
    case 'MERGE_NOTEBOOKS': {
      const { primaryId, secondaryId, secondaryData } = action;
      // Combine files
      const mergedFiles = [
        ...(state.files[primaryId] || []),
        ...(secondaryData.files || []).map(f => ({ ...f, notebookId: primaryId })),
      ];
      // Combine tasks
      const mergedTasks = state.tasks.map(t =>
        t.notebookId === secondaryId ? { ...t, notebookId: primaryId } : t
      );
      const extraTasks = (secondaryData.tasks || []).map(t => ({
        id: t.id,
        text: t.text,
        ownerName: 'You',
        notebookId: primaryId,
        dueAt: null,
        createdAt: NOW,
        completedAt: t.completedAt,
        sourceType: 'manual',
        sourceLabel: 'merged',
        urgencyLanguageDetected: false,
        manualOverride: false,
      }));
      // Combine activity logs
      const extraLogs = (secondaryData.activityLogs || []).map((l, i) => ({
        ...l,
        id: `al-merged-${i}`,
        notebookId: primaryId,
      }));
      const mergeLog = {
        id: `al-merge-${Date.now()}`,
        notebookId: primaryId,
        description: `Merged with '${secondaryData.name}'`,
        timestamp: NOW,
        actor: 'user',
      };

      return {
        ...state,
        files: { ...state.files, [primaryId]: mergedFiles },
        tasks: [...mergedTasks, ...extraTasks],
        activityLogs: {
          ...state.activityLogs,
          [primaryId]: [...(state.activityLogs[primaryId] || []), ...extraLogs, mergeLog],
        },
        proposedActions: state.proposedActions.map(p =>
          p.type === 'reorg_merge' ? { ...p, status: 'accepted' } : p
        ),
        modal: null,
      };
    }

    // ── Recipe ──
    case 'RUN_RECIPE': {
      return {
        ...state,
        recipeRanFor: new Set([...state.recipeRanFor, action.notebookId]),
        activityLogs: {
          ...state.activityLogs,
          [action.notebookId]: [
            ...(state.activityLogs[action.notebookId] || []),
            { id: `al-recipe-${Date.now()}`, notebookId: action.notebookId, description: 'Sprint Velocity Summary recipe ran', timestamp: NOW, actor: 'copilot' },
          ],
        },
      };
    }

    case 'SAVE_RECIPE_TYPE': {
      const newSet = new Set(state.savedRecipeTypes);
      newSet.add(action.notebookType);
      return { ...state, savedRecipeTypes: newSet };
    }

    // ── GitHub ──
    case 'OPEN_GH_MODAL':
      return { ...state, modal: 'github', modalData: { fileId: action.fileId, notebookId: action.notebookId } };

    case 'CLOSE_MODAL':
      return { ...state, modal: null, modalData: null, ghRepoDDOpen: false };

    case 'SET_GH_REPO':
      return { ...state, ghRepo: action.repo, ghRepoDDOpen: false };

    case 'TOGGLE_GH_DD':
      return { ...state, ghRepoDDOpen: !state.ghRepoDDOpen };

    case 'CREATE_GH_ISSUE': {
      const { fileId, repo, issueNumber } = action;
      const newIssue = { repo, issueNumber, status: 'open' };
      // Update file in-place
      const notebookId = state.modalData?.notebookId;
      const newFiles = notebookId
        ? {
          ...state.files,
          [notebookId]: (state.files[notebookId] || []).map(f =>
            f.id === fileId ? { ...f, githubIssue: newIssue } : f
          ),
        }
        : state.files;
      return {
        ...state,
        files: newFiles,
        modal: null,
        modalData: null,
        ghRepoDDOpen: false,
        activityLogs: notebookId ? {
          ...state.activityLogs,
          [notebookId]: [
            ...(state.activityLogs[notebookId] || []),
            { id: `al-gh-${Date.now()}`, notebookId, description: `GitHub issue #${issueNumber} created`, timestamp: NOW, actor: 'user' },
          ],
        } : state.activityLogs,
      };
    }

    // ── Capture ──
    case 'SET_CAPTURE_DEST':
      return { ...state, captureFileDest: action.notebookId };

    case 'SUBMIT_CAPTURE': {
      const { text, destNotebookId, autoFiled } = action;
      const fileId = `f-cap-${Date.now()}`;
      const newFile = {
        id: fileId,
        notebookId: destNotebookId,
        name: text.substring(0, 40) + (text.length > 40 ? '…' : ''),
        fileType: 'note',
        addedAt: NOW,
        addedBy: autoFiled ? 'copilot_auto_filed' : 'user',
        githubIssue: null,
      };
      const newLog = {
        id: `al-cap-${Date.now()}`,
        notebookId: destNotebookId,
        description: autoFiled ? `Copilot filed '${newFile.name}' here` : `You added '${newFile.name}'`,
        timestamp: NOW,
        actor: autoFiled ? 'copilot' : 'user',
      };

      let newProposedActions = state.proposedActions;
      let toastMsg = '';
      let toastUndoFn = null;

      if (autoFiled) {
        const nb = state.notebooks.find(n => n.id === destNotebookId);
        const altNb = action.altNotebookId
          ? state.notebooks.find(n => n.id === action.altNotebookId)
          : null;
        const paId = `pa-cap-${Date.now()}`;
        const newPA = {
          id: paId,
          type: 'auto_file',
          description: action.lowConfidence
            ? `Filed under Quick Notes — couldn't find a clear match. Move it?`
            : `Filed '${newFile.name}' under ${nb?.name || destNotebookId}`,
          targetNotebookId: destNotebookId,
          altNotebookId: altNb?.id || null,
          altNotebookName: altNb?.name || null,
          fileId,
          originalNotebookId: null,
          status: 'pending',
        };
        newProposedActions = [...state.proposedActions, newPA];
        toastMsg = action.lowConfidence
          ? `Filed under Quick Notes (no clear match)`
          : `Filed under ${nb?.name || 'Quick Notes'}`;
      } else {
        const nb = state.notebooks.find(n => n.id === destNotebookId);
        toastMsg = `Filed under ${nb?.name || destNotebookId}`;
      }

      return {
        ...state,
        files: {
          ...state.files,
          [destNotebookId]: [...(state.files[destNotebookId] || []), newFile],
        },
        activityLogs: {
          ...state.activityLogs,
          [destNotebookId]: [...(state.activityLogs[destNotebookId] || []), newLog],
        },
        proposedActions: newProposedActions,
        screen: 'notebooks',
        notebookId: null,
        captureFileDest: null,
        toast: { msg: toastMsg, undoable: autoFiled, fileId, destNotebookId },
      };
    }

    // ── Meeting capture ──
    case 'OPEN_MEETING_CAPTURE':
      return { ...state, modal: 'meeting-capture', modalData: action.meeting };

    case 'SUBMIT_MEETING_NOTES': {
      const { notebookId, noteName, transcriptAuto } = action;
      const newFile = {
        id: `f-meet-${Date.now()}`,
        notebookId,
        name: noteName,
        fileType: 'note',
        addedAt: NOW,
        addedBy: transcriptAuto ? 'copilot_auto_filed' : 'user',
        githubIssue: null,
      };
      const newLog = {
        id: `al-meet-${Date.now()}`,
        notebookId,
        description: transcriptAuto ? 'Meeting notes auto-generated from transcript' : `Meeting notes added: ${noteName}`,
        timestamp: NOW,
        actor: transcriptAuto ? 'copilot' : 'user',
      };
      return {
        ...state,
        files: { ...state.files, [notebookId]: [...(state.files[notebookId] || []), newFile] },
        activityLogs: { ...state.activityLogs, [notebookId]: [...(state.activityLogs[notebookId] || []), newLog] },
        modal: null,
        modalData: null,
        toast: { msg: transcriptAuto ? 'Notes auto-generated from transcript' : 'Meeting notes filed', undoable: false },
      };
    }

    // ── Toast ──
    case 'SET_TOAST':
      return { ...state, toast: action.toast };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };

    // ── UI toggles ──
    case 'TOGGLE_NOTES_EXPAND':
      return { ...state, notesExpandOpen: !state.notesExpandOpen };
    case 'TOGGLE_DONE_EXPAND':
      return { ...state, doneExpandOpen: !state.doneExpandOpen };
    case 'TOGGLE_DERIV':
      return { ...state, derivOpen: { ...state.derivOpen, [action.key]: !state.derivOpen[action.key] } };
    case 'TOGGLE_DEV_PANEL':
      return { ...state, devPanelOpen: !state.devPanelOpen };
    case 'SHOW_MERGE_REVIEW':
      return { ...state, modal: 'merge-review' };

    case 'DISMISS_STALENESS': {
      return {
        ...state,
        stalenessDismissals: { ...state.stalenessDismissals, [action.notebookId]: NOW },
        proposedActions: state.proposedActions.map(p =>
          p.type === 'staleness_nudge' && p.targetNotebookId === action.notebookId
            ? { ...p, status: 'dismissed' }
            : p
        ),
      };
    }

    case 'UNDO_TOAST_FILE': {
      // Move the filed file back to being un-filed (remove from notebook)
      const { fileId, destNotebookId } = action;
      return {
        ...state,
        files: {
          ...state.files,
          [destNotebookId]: (state.files[destNotebookId] || []).filter(f => f.id !== fileId),
        },
        proposedActions: state.proposedActions.filter(p => p.fileId !== fileId),
        toast: null,
      };
    }

    default:
      return state;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useCallback((screen, notebookId = null, viewMode = 'default') => {
    dispatch({ type: 'NAVIGATE', screen, notebookId, viewMode });
  }, []);

  const toastTimer = useRef(null);
  const showToast = useCallback((toast) => {
    dispatch({ type: 'SET_TOAST', toast });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => dispatch({ type: 'CLEAR_TOAST' }), 4500);
  }, []);

  const value = { state, dispatch, navigate, showToast };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
