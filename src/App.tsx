import { Component } from "react";
import Header from "./components/header";
import {
  HandlerInputType,
  HandlerSubmitType,
  IAnimal,
  IAnimals,
} from "./types/types";
import { List } from "./components/gallery";
import ErrorBoundary from "./components/errorBoundary";
interface IAppState {
  value: string;
  data: IAnimal[];
}
const API_BASE_URL = "http://stapi.co/api/v1/rest/animal/search";
const PAGE_SIZE = 12;


export class App extends Component {
  state: IAppState = {
    value: "",
    data: [],
  };
  componentDidMount = async () => {
    try {
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
          `${API_BASE_URL}?pageNumber=1&pageSize=&${PAGE_SIZE}`
        );
        const animals: IAnimals = await response.json();
        this.setState({ data: animals.animals });
      } }catch (err) {
        console.error(err);
      }
    }
    handleInputSearch: HandlerInputType = (event) => {
    this.setState({ value: event.currentTarget.value });
    console.log(this.state.value);
  };
  handleSubmitSearch: HandlerSubmitType = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${API_BASE_URL}?name=${this.state.value}&pageSize=${PAGE_SIZE}`
        ,
        {
          method: "POST",
        }
      );
      const animals: IAnimals = await response.json();
      console.log(animals.animals);
      this.setState({ data: animals.animals });
      localStorage.setItem("lastSearch", JSON.stringify(animals.animals));
      localStorage.setItem("lastQuery", this.state.value);
    } catch (error) {
     
      console.error(error);
     
    }
  };

  render() {
    
    const { value, data } = this.state;
    
    return (
      <> <ErrorBoundary title="Seems like an error occured!">
        <Header
          handleInputSearch={this.handleInputSearch}
          handleSubmitSearch={this.handleSubmitSearch}
          value={value}
        />
       
        <List animals={data} /></ErrorBoundary>
      </>
    );
  }
}

export default App;
