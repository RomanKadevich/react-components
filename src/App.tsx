import { Component } from "react";
import Header from "./components/header";
import { HandlerInputType, HandlerSubmitType } from "./types/types";

export class App extends Component {
  state = {
    value: "",
  };
  handleInputSearch: HandlerInputType = (event) => {
    this.setState({ value: event.currentTarget.value });
    console.log(this.state.value);
  };
  handleSubmitSearch: HandlerSubmitType = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "http://stapi.co/api/v1/rest/animal/search?pageNumber=2",
    );
    const data = await response.json();
    console.log(data);
  };
  render() {
    const { value } = this.state;
    return (
      <>
        <Header
          handleInputSearch={this.handleInputSearch}
          handleSubmitSearch={this.handleSubmitSearch}
          value={value}
        />
      </>
    );
  }
}

export default App;
