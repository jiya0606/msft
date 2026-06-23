import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../store.jsx';
import { StarIcon, BtnOutline } from '../App.jsx';

const INITIAL_MESSAGES = [
  {
    id: 'm1', role: 'user',
    content: 'what did Tom say about the contrast issue',
  },
  {
    id: 'm2', role: 'assistant',
    content: 'Tom flagged a contrast issue on the confirmation screen during the last Launch Sync meeting. He estimated it\'s a quick fix — about 3 days of engineering work. Here\'s the source:',
    resultCard: {
      notebook: 'Checkout Redesign Launch',
      notebookId: 'checkout-redesign',
      title: 'Launch Sync — Meeting Notes',
      preview: 'Tom flagged a contrast issue on the confirmation screen; estimated 3 days for the fix.',
    },
  },
];

const SUGGESTIONS = [
  "What's outstanding on Checkout Redesign Launch?",
  'Show me my open tasks',
  'Summarize my last 1:1 with Priya',
];

// Very simple chat response generation for demo
function generateResponse(input, notebooks) {
  const lower = input.toLowerCase();
  if (lower.includes('open tasks') || lower.includes('todo') || lower.includes('to-do')) {
    return { content: 'You have 10 open tasks across 6 notebooks. The highest priority is "Send updated mockups to Priya" due to the meeting in 40 minutes. Would you like me to show you the full list?' };
  }
  if (lower.includes('priya') && lower.includes('1:1')) {
    return {
      content: 'Your last 1:1 with Priya Nair was on June 19. Topics covered: sprint 24 scope confirmation, contrast fix progress, and upcoming launch timeline.',
      resultCard: {
        notebook: 'Priya Nair — 1:1',
        notebookId: 'priya-1on1',
        title: 'Priya 1:1 — Meeting Notes (June 19)',
        preview: 'Sprint 24 scope confirmation, contrast fix progress, upcoming launch timeline.',
      },
    };
  }
  if (lower.includes('checkout redesign')) {
    return { content: 'The Checkout Redesign Launch notebook has 4 open tasks, an upcoming sync today at 2 PM, and a pending legal sign-off. Tom is working on the contrast fix, estimated EOD tomorrow.' };
  }
  if (lower.includes('marcus') || lower.includes('launch timeline')) {
    return {
      content: 'Marcus Webb emailed asking about the launch timeline. He wants confirmation that the end-of-month date is still on track. This is also flagged as an urgent item in your to-do list.',
      resultCard: {
        notebook: 'Marcus Webb — 1:1',
        notebookId: 'marcus-1on1',
        title: 'Email from Marcus Webb',
        preview: 'Marcus asked over email whether the launch is still on track for end of month.',
      },
    };
  }
  return { content: `I searched your notebooks for "${input}" and found ${Math.floor(Math.random() * 3 + 1)} related note${Math.random() > 0.5 ? 's' : ''}. Would you like me to list them?` };
}

export default function ChatScreen() {
  const { state, navigate } = useApp();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function send(text) {
    if (!text.trim()) return;
    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: text };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const response = generateResponse(text, state.notebooks);
      setMessages(m => [...m, { id: `a-${Date.now()}`, role: 'assistant', ...response }]);
      setLoading(false);
    }, 600);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: 860, padding: '0 32px' }}>
      <div style={{ padding: '32px 0 16px' }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#111827', letterSpacing: '-0.3px' }}>Chat</div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 24 }}>
        {messages.map(msg => (
          <div key={msg.id}>
            {msg.role === 'user' ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ background: '#2563EB', color: '#fff', padding: '12px 16px', borderRadius: '16px 16px 4px 16px', maxWidth: 400, fontSize: 14, lineHeight: 1.5 }}>
                  {msg.content}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560 }}>
                <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{msg.content}</div>
                {msg.resultCard && (
                  <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 4 }}>From notebook: {msg.resultCard.notebook}</div>
                    <div style={{ fontWeight: 600, color: '#111827', marginBottom: 6 }}>{msg.resultCard.title}</div>
                    <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, marginBottom: 12 }}>{msg.resultCard.preview}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <BtnOutline onClick={() => navigate('notebook-detail', msg.resultCard.notebookId)}>Open</BtnOutline>
                      <BtnOutline>Move to a different notebook</BtnOutline>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9CA3AF', fontSize: 13 }}>
            <StarIcon color="#3B82F6" /> Thinking…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{ padding: '16px 0 24px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12 }}>
          <div style={{ color: '#9CA3AF' }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2={16.65} y2={16.65} /></svg>
          </div>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask about anything in your notebooks…"
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#111827', background: 'transparent' }}
          />
          {input.trim() && (
            <button
              onClick={() => send(input)}
              style={{ background: '#2563EB', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontSize: 13 }}
            >
              Send
            </button>
          )}
        </div>

        {/* Suggestion chips */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          {SUGGESTIONS.map((s, i) => (
            <div
              key={i}
              onClick={() => send(s)}
              style={{ padding: '8px 14px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, fontSize: 13, color: '#6B7280', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.color = '#374151'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#6B7280'; }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
