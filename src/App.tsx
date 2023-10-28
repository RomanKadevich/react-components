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
  error: Error | null;
}
const API_BASE_URL = "http://stapi.co/api/v1/rest/animal/search";
const PAGE_SIZE = 12;

export class App extends Component {
  state: IAppState = {
    value: "",
    data: [],
    error: null,
  };
  componentDidMount = async () => {
    try {
      const lastSearchData: string | null = localStorage.getItem("lastSearch");
      const lastQueryData: string | null = localStorage.getItem("lastQuery");
      if (lastSearchData) {
        const lastSearch: IAnimal[] = JSON.parse(lastSearchData);
        this.setState({ data: lastSearch, error: null });
        if (lastQueryData) {
          this.setState({ value: lastQueryData, error: null });
        }
      } else {
        const response = await fetch(
          `${API_BASE_URL}?pageNumber=1&pageSize=${PAGE_SIZE}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const animals: IAnimals = await response.json();
        this.setState({ data: animals.animals, error: null });
      }
    } catch (error) {
      this.setState({ error, data: [] });
    }
  };
  handleInputSearch: HandlerInputType = (event) => {
    this.setState({ value: event.currentTarget.value });
    console.log(this.state.value);
  };
  handleSubmitSearch: HandlerSubmitType = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${API_BASE_URL}?name=${this.state.value}&pageSize=${PAGE_SIZE}`,
        {
          method: "POST",
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const animals: IAnimals = await response.json();
      this.setState({ data: animals.animals, error: null });
      localStorage.setItem("lastSearch", JSON.stringify(animals.animals));
      localStorage.setItem("lastQuery", this.state.value);
    } catch (error) {
      this.setState({ error, data: [] });
    }
  };

  render() {
    const { value, data, error } = this.state;

    return (
      <>
        {error ? (
          <div className="bg-white p-3 text-center text-red-500 font-bold">
            Error when loading data{error.message}
          </div>
        ) : null}
        {data ? (
          <>
            {" "}
            <Header
              handleInputSearch={this.handleInputSearch}
              handleSubmitSearch={this.handleSubmitSearch}
              value={value}
            />
            <List animals={data} />
          </>
        ) : null}
      </>
    );
  }
}

export default App;
