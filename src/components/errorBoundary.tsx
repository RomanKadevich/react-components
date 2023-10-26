import { Component, ReactNode } from 'react'

interface IErrorBoundary{
    title: string;
    children: ReactNode;
}

interface IErrorBoundaryState {
    error: Error | null;
  }
export class ErrorBoundary extends Component<IErrorBoundary, IErrorBoundaryState> {
    state: IErrorBoundaryState={
        error:null,
    }
    static getDerivedStateFromError(error: Error){
        return {error: error}
    }
  render() {
    const {error} = this.state;
    if(error){
        return (
            <div>
                    <p>{this.props.title}</p>
                    <p>{error.message}</p>
                </div>
        )
    }
    return this.props.children;
  }
}

export default ErrorBoundary