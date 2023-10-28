import { Component, ReactNode, createContext } from "react";

interface IErrorBoundary {
  children: ReactNode;
}

export interface IErrorBoundaryContext {
  triggerError: (error: Error) => void;
}
interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
const ErrorBoundaryContext = createContext<IErrorBoundaryContext | undefined>(
  undefined,
);

class MyErrorBoundary extends Component<IErrorBoundary, IErrorBoundaryState> {
  state:IErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  triggerError = (error: Error) => {
    console.error("Error caught by MyErrorBoundary:", error);
    this.setState({ hasError: true, error });
  };

  render() {
    const { hasError, error } = this.state;
    if (hasError && error) {
      return (
        <ErrorBoundaryContext.Provider
          value={{ triggerError: this.triggerError }}
        >
          <div className="flex justify-center items-center h-[100vh]">
            <div className="flex flex-col w-300 h-300 bg-white p-20 text-red-500 rounded">
              <p className="text-xl font-bold">Error: {error.message}</p>
              <button
                className="mt-4 px-4 py-2 bg-violet-950 text-white rounded hover:bg-violet-700"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Retry
              </button>
            </div>
          </div>
        </ErrorBoundaryContext.Provider>
      );
    }

    return (
      <ErrorBoundaryContext.Provider
        value={{ triggerError: this.triggerError }}
      >
        {this.props.children}
      </ErrorBoundaryContext.Provider>
    );
  }
}

export { MyErrorBoundary, ErrorBoundaryContext };
