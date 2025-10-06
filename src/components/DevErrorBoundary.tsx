import React from 'react';

type State = { error: Error | null };

export class DevErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(err: Error, info: any) {
    console.error('DevErrorBoundary caught:', err, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
        color: '#fff', padding: 16, overflow: 'auto', zIndex: 9999, fontFamily: 'monospace'
      }}>
        <h2 style={{marginTop: 0}}>🔥 Runtime error</h2>
        <pre style={{whiteSpace: 'pre-wrap'}}>{String(this.state.error.stack || this.state.error.message || this.state.error)}</pre>
        <p>Открой консоль для деталей. Это оверлей только на время отладки.</p>
      </div>
    );
  }
}
