import { IAnimals } from "../types/types";

export class Api {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  async getItems(
    page: string | undefined,
    pageSize: number,
    search?: string | null,
  ) {
    const params = new URLSearchParams();
    let response: Response | undefined = undefined;

    params.set("pageNumber", `${page ? +page - 1 : 1}`);
    params.set("pageSize", `${pageSize}`);
    if (search) {
      params.set("name", search);
    }

    const apiUrl = new URL(this.url);
    apiUrl.search = params.toString();

    try {
      response = await fetch(apiUrl.toString(), {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const animals: IAnimals = await response.json();
      return animals;
    } catch {
      throw new Error("Network response was not ok");
    }
  }
}
