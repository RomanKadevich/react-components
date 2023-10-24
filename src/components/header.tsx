import React, { Component } from "react";

export class Header extends Component {
  render() {
    return (
      <header className="p-16 bg-neutral-900">
        <div className="container mx-auto flex justify-center gap-4">
          <input
            className="p-4 w-64 h-8"
            placeholder="Please enter your request"
          ></input>
          <button className="w-8 h-8 bg-transporent bg-cover bg-[url('./assets/search.svg')] hover:scale-90 hover:opacity-75 transition-opacity transition-transform ease-in-out duration-300"></button>
        </div>
      </header>
    );
  }
}

export default Header;
