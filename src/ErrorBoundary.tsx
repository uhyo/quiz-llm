import { Component, PropsWithChildren } from "react";

export class ErrorBoundary extends Component<PropsWithChildren> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>エラーが発生しました</p>
          <p>{this.state.error}</p>
        </div>
      );
    }
    return <>{this.props.children}</>;
  }
}
