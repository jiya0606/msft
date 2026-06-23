import React, { useRef, useState } from 'react';
import { useApp } from '../store.jsx';
import { BtnPrimary, ChevronDown, CheckIcon } from '../App.jsx';
import { classifyContent } from '../data.js';

export default function NewCaptureScreen() {
  const { state, dispatch } = useApp();
  const { notebooks, captureFileDest } = state;
  const [text, setText] = useState('Talked to Tom about the contrast issue — he thinks it\'s a quick fix, should be ready by EOD tomorrow.');
  const [ddOpen, setDdOpen] = useState(false);
  const selectedNb = notebooks.find(n => n.id === captureFileDest);

  function handleDone() {
    if (!text.trim()) return;

    if (captureFileDest) {
      // User manually selected a notebook
      dispatch({
        type: 'SUBMIT_CAPTURE',
        text: text.trim(),
        destNotebookId: captureFileDest,
        autoFiled: false,
      });
    } else {
      // Auto-classify
      const matches = classifyContent(text, notebooks);
      if (matches.length === 0) {
        // No match → Quick Notes
        dispatch({
          type: 'SUBMIT_CAPTURE',
          text: text.trim(),
          destNotebookId: 'quick-notes',
          autoFiled: true,
          lowConfidence: true,
        });
      } else if (matches.length === 1) {
        dispatch({
          type: 'SUBMIT_CAPTURE',
          text: text.trim(),
          destNotebookId: matches[0].notebook.id,
          autoFiled: true,
          lowConfidence: false,
        });
      } else {
        // Multiple matches → top match, offer alt
        dispatch({
          type: 'SUBMIT_CAPTURE',
          text: text.trim(),
          destNotebookId: matches[0].notebook.id,
          altNotebookId: matches[1]?.notebook.id || null,
          autoFiled: true,
          lowConfidence: false,
        });
      }
    }
  }

  return (
    <div style={{ padding: 32, maxWidth: 860, display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: '#111827' }}>New Capture</div>

        {/* File to... dropdown */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setDdOpen(o => !o)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid #E5E7EB', borderRadius: 6, cursor: 'pointer', fontSize: 13, color: selectedNb ? '#059669' : '#6B7280' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#D1D5DB'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}
          >
            {selectedNb ? (
              <>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ fontWeight: 500 }}>{selectedNb.name}</span>
              </>
            ) : (
              'File to...'
            )}
            <ChevronDown />
          </div>

          {ddOpen && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: 300, maxHeight: 340, overflowY: 'auto', zIndex: 50 }}>
              {notebooks.filter(nb => nb.id !== 'quick-notes').map(nb => (
                <div
                  key={nb.id}
                  onClick={() => {
                    dispatch({ type: 'SET_CAPTURE_DEST', notebookId: nb.id });
                    setDdOpen(false);
                  }}
                  style={{ padding: '10px 16px', cursor: 'pointer', fontSize: 13, color: '#374151', display: 'flex', alignItems: 'center', gap: 8 }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}
                >
                  {captureFileDest === nb.id && <CheckIcon color="#2563EB" size={12} />}
                  {nb.name}
                </div>
              ))}
              <div style={{ borderTop: '1px solid #E5E7EB', padding: '10px 16px', cursor: 'pointer', fontSize: 13, color: '#2563EB', display: 'flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={12} y1={5} x2={12} y2={19} /><line x1={5} y1={12} x2={19} y2={12} /></svg>
                Create new notebook
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Text editor area */}
      <div style={{ flex: 1, background: '#fff', borderRadius: 8, border: '1px solid #E5E7EB', padding: 24, minHeight: 300 }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          autoFocus
          placeholder="Start typing or paste content here…"
          style={{
            width: '100%', minHeight: 240, border: 'none', outline: 'none',
            fontSize: 15, lineHeight: 1.7, color: '#374151', resize: 'none',
            fontFamily: 'inherit', background: 'transparent',
          }}
        />
      </div>

      {/* Auto-file hint */}
      {!selectedNb && (
        <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 12, textAlign: 'center' }}>
          If you don't choose a notebook, Copilot will file this automatically when you're done.
        </div>
      )}

      {/* Done button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <BtnPrimary onClick={handleDone} style={{ padding: '10px 24px', fontSize: 14, borderRadius: 8 }}>
          Done
        </BtnPrimary>
      </div>
    </div>
  );
}
