import { Component } from "react";
import Header from "./components/header";
import {
  HandlerInputType,
  HandlerSubmitType,
  IAnimal,
  IAnimals,
} from "./types/types";
import { List } from "./components/gallery";
interface IAppState {
  value: string;
  data: IAnimal[];
  // search:string;
}
export class App extends Component {
  state: IAppState = {
    value: "",
    data: [],
    // search:""
  };
  componentDidMount = async () => {
    const lastSearchData: string | null = localStorage.getItem("lastSearch");
    const lastQueryData: string | null = localStorage.getItem("lastQuery");
    if (lastSearchData) {
      const lastSearch: IAnimal[] = JSON.parse(lastSearchData);
      this.setState({ data: lastSearch });
      if (lastQueryData) {
        this.setState({ value: lastQueryData });
      }
    } else {
      const response = await fetch(
        "http://stapi.co/api/v1/rest/animal/search?pageNumber=1&pageSize=12"
      );
      const animals: IAnimals = await response.json();
      console.log(animals);
      this.setState({ data: animals.animals });
    }
  };
  handleInputSearch: HandlerInputType = (event) => {
    this.setState({ value: event.currentTarget.value });
    console.log(this.state.value);
  };
  handleSubmitSearch: HandlerSubmitType = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `http://stapi.co/api/v1/rest/animal/search?name=${this.state.value}&pageSize=12`,
      {
        method: "POST",
      }
    );
    const animals: IAnimals = await response.json();
    console.log(animals.animals);
    this.setState({ data: animals.animals });
    localStorage.setItem("lastSearch", JSON.stringify(animals.animals));
    localStorage.setItem("lastQuery", this.state.value);
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
