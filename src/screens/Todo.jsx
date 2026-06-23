import React from 'react';
import { useApp } from '../store.jsx';
import { ProposedActionCard, BtnPrimary, BtnGhost, StarIcon, GripIcon } from '../App.jsx';
import { checkStaleness } from '../data.js';

export default function TodoScreen({ rankedTasks }) {
  const { state, dispatch, navigate } = useApp();
  const { todoView, notebooks, tasks, stalenessDismissals, activityLogs } = state;

  // Staleness nudges
  const staleNudges = checkStaleness(notebooks, activityLogs, stalenessDismissals);

  // Build display tasks with notebook name + score info
  const displayTasks = rankedTasks.map(t => {
    const nb = notebooks.find(n => n.id === t.notebookId);
    return { ...t, notebook: nb?.name || t.notebookId };
  });

  // Group by notebook
  const groups = {};
  displayTasks.forEach(t => {
    if (!groups[t.notebookId]) {
      groups[t.notebookId] = { id: t.notebookId, name: t.notebook, items: [] };
    }
    groups[t.notebookId].items.push(t);
  });
  const todoGroups = Object.values(groups);

  const sgBase = 'padding:8px 16px;font-size:13px;cursor:pointer;border:1px solid #E5E7EB';

  return (
    <div style={{ padding: 32, maxWidth: 860 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>To-Do</div>
        <div style={{ display: 'flex' }}>
          <button
            onClick={() => dispatch({ type: 'SET_TODO_VIEW', view: 'all' })}
            style={{
              padding: '8px 16px', fontSize: 13, fontWeight: todoView === 'all' ? 600 : 500,
              cursor: 'pointer', borderRadius: '6px 0 0 6px',
              background: todoView === 'all' ? '#2563EB' : '#fff',
              color: todoView === 'all' ? '#fff' : '#374151',
              border: '1px solid #E5E7EB',
            }}
          >All</button>
          <button
            onClick={() => dispatch({ type: 'SET_TODO_VIEW', view: 'by-notebook' })}
            style={{
              padding: '8px 16px', fontSize: 13, fontWeight: todoView === 'by-notebook' ? 600 : 500,
              cursor: 'pointer', borderRadius: '0 6px 6px 0',
              background: todoView === 'by-notebook' ? '#2563EB' : '#fff',
              color: todoView === 'by-notebook' ? '#fff' : '#374151',
              border: '1px solid #E5E7EB', borderLeft: 'none',
            }}
          >By Notebook</button>
        </div>
      </div>

      {/* Staleness nudges */}
      {staleNudges.map(nudge => (
        <ProposedActionCard
          key={nudge.notebookId}
          description={`You haven't had a 1:1 with ${nudge.personName} in ${nudge.weeksLabel} — you usually meet ${nudge.periodLabel}. Want to schedule one?`}
        >
          <BtnPrimary onClick={() => navigate('notebook-detail', nudge.notebookId)}>Schedule</BtnPrimary>
          <BtnGhost onClick={() => dispatch({ type: 'DISMISS_STALENESS', notebookId: nudge.notebookId })}>Dismiss</BtnGhost>
        </ProposedActionCard>
      ))}
      {staleNudges.length > 0 && <div style={{ height: 20 }} />}

      {/* All view */}
      {todoView === 'all' && (
        <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
          {displayTasks.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: '#9CA3AF', fontSize: 14 }}>All tasks complete! 🎉</div>
          ) : displayTasks.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid #F3F4F6' }}>
              {/* Grip */}
              <span style={{ color: '#D1D5DB', cursor: 'grab', flexShrink: 0 }}><GripIcon /></span>
              {/* Checkbox */}
              <div
                onClick={() => dispatch({ type: 'TOGGLE_TASK', taskId: t.id })}
                style={{
                  width: 18, height: 18, borderRadius: 4,
                  border: '2px solid #D1D5DB', background: 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', flexShrink: 0,
                }}
              />
              {/* Text */}
              <div style={{ flex: 1, minWidth: 0, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.text}</div>
              {/* Tag */}
              <div style={{ fontSize: 12, color: '#9CA3AF', whiteSpace: 'nowrap', flexShrink: 0 }}>{t._reason}</div>
              {/* Notebook pill */}
              <div
                onClick={() => navigate('notebook-detail', t.notebookId)}
                style={{ fontSize: 11, color: '#6B7280', background: '#F3F4F6', padding: '2px 8px', borderRadius: 10, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
              >{t.notebook}</div>
              {/* Pin */}
              <button
                onClick={() => dispatch({ type: 'PIN_TASK', taskId: t.id })}
                title={t.manualOverride ? 'Unpin' : 'Pin to top'}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.manualOverride ? '#2563EB' : '#E5E7EB', padding: '2px 4px', flexShrink: 0, fontSize: 13 }}
              >📌</button>
            </div>
          ))}
        </div>
      )}

      {/* By notebook view */}
      {todoView === 'by-notebook' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {todoGroups.map(g => (
            <div key={g.id} style={{ background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              <div
                onClick={() => navigate('notebook-detail', g.id)}
                style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', fontWeight: 600, color: '#111827', background: '#F9FAFB', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
                onMouseLeave={e => e.currentTarget.style.background = '#F9FAFB'}
              >
                {g.name}
                <span style={{ fontSize: 12, fontWeight: 500, color: '#9CA3AF' }}>{g.items.length} tasks</span>
              </div>
              {g.items.map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid #F3F4F6' }}>
                  <div
                    onClick={() => dispatch({ type: 'TOGGLE_TASK', taskId: t.id })}
                    style={{ width: 18, height: 18, borderRadius: 4, border: '2px solid #D1D5DB', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, color: '#111827' }}>{t.text}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', whiteSpace: 'nowrap', flexShrink: 0 }}>{t._reason}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
