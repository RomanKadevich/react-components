import { Component } from "react";
import Header from "./components/header";
import { HandlerInputType } from "./types/types";

export class App extends Component {
  state = {
    value: "",
  };
  handleInput: HandlerInputType = (event) => {
    this.setState({ value: event.currentTarget.value });
    console.log(this.state.value);
  };
  render() {
    return (
      <>
        <Header handleInput={this.handleInput} value={this.state.value} />
      </>
    );
  }
}

export default App;
