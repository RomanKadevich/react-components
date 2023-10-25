import { Component } from "react";
import Header from "./components/header";
import {
  HandlerInputType,
  HandlerSubmitType,
  IAnimal,
  IAnimals,
} from "./types/types";
import  { List } from "./components/gallery";
interface IAppState {
  value: string;
  data: IAnimal[];
}
export class App extends Component {
  state: IAppState = {
    value: "",
    data: [],
  };
  componentDidMount = async () => {
    const response = await fetch(
      "http://stapi.co/api/v1/rest/animal/search?pageNumber=2",
    );
    const animals: IAnimals = await response.json();
    console.log(animals);
    this.setState({ data: animals.animals });
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
    const animals: IAnimals = await response.json();
    console.log(animals.animals);
    this.setState({ data: animals.animals });
  };
  render() {
    const { value, data } = this.state;
    return (
      <>
        <Header
          handleInputSearch={this.handleInputSearch}
          handleSubmitSearch={this.handleSubmitSearch}
          value={value}
        />
        <List animals={data} />
      </>
    );
  }
}

export default App;
