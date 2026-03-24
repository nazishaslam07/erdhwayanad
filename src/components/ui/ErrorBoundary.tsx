import React, { useState, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, retryCount: 0 };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App error:', error, errorInfo);
    // Could log to error tracking service here
  }

  handleRetry = () => {
    const newCount = this.state.retryCount + 1;
    if (newCount >= 3) {
      // Hard reload after 3 retries
      window.location.reload();
      return;
    }
    this.setState({ hasError: false, error: null, retryCount: newCount });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: '#faf8f3',
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '400px',
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#3d3228',
              marginBottom: '12px',
            }}>
              Something went wrong
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '24px',
              lineHeight: '1.6',
            }}>
              We're having trouble loading the page. This might be a temporary network issue or your device needs more resources.
            </p>
            <div style={{ marginBottom: '16px' }}>
              {this.state.error && (
                <details style={{
                  fontSize: '12px',
                  color: '#999',
                  textAlign: 'left',
                  background: '#f5f3f0',
                  padding: '12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}>
                  <summary style={{ cursor: 'pointer', fontWeight: '500' }}>
                    Error details
                  </summary>
                  <code style={{
                    display: 'block',
                    marginTop: '8px',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}>
                    {this.state.error.message}
                  </code>
                </details>
              )}
            </div>
            <button
              onClick={this.handleRetry}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background: '#a68068',
                color: '#fff',
                border: 'none',
                borderRadius: '24px',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#8b6a54')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#a68068')}
            >
              {this.state.retryCount === 0 ? 'Try Again' : `Retry (${this.state.retryCount}/3)`}
            </button>
            <p style={{
              fontSize: '12px',
              color: '#999',
              marginTop: '16px',
            }}>
              If this persists, try clearing your browser cache or <a href="/" style={{ color: '#a68068' }}>reloading the page</a>.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
