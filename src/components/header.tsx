import { Component } from "react";
import { HandlerInputType } from "../types/types";
import { HandlerSubmitType } from "../types/types";
import { ErrorBoundaryContext } from "./errorBoundary";

export interface IHeader {
  handleInputSearch: HandlerInputType;
  handleSubmitSearch: HandlerSubmitType;
  value: string;
}

export class Header extends Component<IHeader> {
  render() {
    const { handleInputSearch, handleSubmitSearch, value } = this.props;

    return (
      <header className="p-16 bg-violet-950">
        <div className="container mx-auto flex flex-wrap justify-center gap-4">
          <input
            className="p-4 w-64 h-8"
            placeholder="Please enter your request"
            value={value}
            onChange={handleInputSearch}
          ></input>
          <button
            onClick={handleSubmitSearch}
            className="w-8 h-8 bg-transparent bg-cover bg-[url('./assets/search.svg')] hover:scale-90 transition-opacity transition-transform ease-in-out duration-300"
          ></button>
          <ErrorBoundaryContext.Consumer>
            {(context) => (
              <button className="px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-600 ml-4"
                onClick={() => context?context.triggerError(new Error("Test error")):undefined}
              >
                Test error
              </button>
            )}
          </ErrorBoundaryContext.Consumer>
        </div>
      </header>
    );
  }
}

export default Header;
