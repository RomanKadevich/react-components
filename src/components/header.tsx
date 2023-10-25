import { Component } from "react";
import { HandlerInputType } from "../types/types";

export interface IHeader {
  handleInput: HandlerInputType;
  value: string;
}

export class Header extends Component<IHeader> {
  render() {
    return (
      <header className="p-16 bg-neutral-900">
        <div className="container mx-auto flex justify-center gap-4">
          <input
            className="p-4 w-64 h-8"
            placeholder="Please enter your request"
            defaultValue={this.props.value}
            onChange={this.props.handleInput}
          ></input>
          <button className="w-8 h-8 bg-transparent bg-cover bg-[url('./assets/search.svg')] hover:scale-90 transition-opacity transition-transform ease-in-out duration-300"></button>
        </div>
      </header>
    );
  }
}

export default Header;
