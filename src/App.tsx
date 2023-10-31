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
  isLoading: boolean;
}
const API_BASE_URL = "https://stapi.co/api/v1/rest/animal/search";
const PAGE_SIZE = 12;

export class App extends Component {
  state: IAppState = {
    value: "",
    data: [],
    error: null,
    isLoading: false
  };
  componentDidMount = async () => {
    try {
      this.setState({isLoading:true})
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
        this.setState({isLoading:false})
        this.setState({ data: animals.animals, error: null });
      }
    } catch (error) {
      this.setState({ error, data: [] });
    }
  };
  handleInputSearch: HandlerInputType = (event) => {
    this.setState({ value: event.currentTarget.value });
  };
  handleSubmitSearch: HandlerSubmitType = async (event) => {
    event.preventDefault();
    try {
      this.setState({isLoading:true})
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
      this.setState({isLoading:false})
      this.setState({ data: animals.animals, error: null });
      localStorage.setItem("lastSearch", JSON.stringify(animals.animals));
      localStorage.setItem("lastQuery", this.state.value);
    } catch (error) {
      this.setState({ error, data: [] });
    }
  };

  render() {
    const { value, data, error, isLoading } = this.state;

    return (
      <>
        {error ? (
          <div className="bg-white p-3 text-center text-red-500 font-bold">
            Error when loading data{error.message}
          </div>
        ) : null}
        {data ? (
          <>
            <Header
              handleInputSearch={this.handleInputSearch}
              handleSubmitSearch={this.handleSubmitSearch}
              value={value}
            />
            {isLoading&&<div className="flex justify-center items-center font-bold text-lg"><p>Loading...</p></div>}
            <List animals={data} />
          </>
        ) : null}
      </>
    );
  }
}

export default App;
