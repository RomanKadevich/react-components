import { useCallback, useEffect, useState } from "react";
import { IAnimal, IAnimals, IPropertyLabels } from "../types/types";
import { useSearchParams } from "react-router-dom";
interface IDetailsState {
  data: IAnimal | null;
  error: Error | null;
  isLoading: boolean;
}
const propertyLabels: Record<keyof IPropertyLabels, string> = {
  earthAnimal: "Earth Animal",
  earthInsect: "Earth Insect",
  avian: "Avian",
  canine: "Canine",
  feline: "Feline",
};
const Details = () => {
  const [searchParams] = useSearchParams();
  const details = searchParams.get("details");

  const initialState: IDetailsState = {
    data: null,
    error: null,
    isLoading: false,
  };
  const [state, setState] = useState(initialState);
  const API_BASE_URL = "https://stapi.co/api/v1/rest/animal/search/";
  const getData = useCallback(async () => {
    const response = await fetch(`${API_BASE_URL}?&name=${details}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const animals: IAnimals = await response.json();
    return animals.animals[0];
  }, [details]);
  useEffect(() => {
    const loadData = async () => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        const animals: IAnimal = await getData();
        setState((prevState) => ({
          ...prevState,
          data: animals,
          error: null,
          isLoading: false,
        }));
      } catch (error) {
        if (error instanceof Error) {
          setState((prev) => ({ ...prev, error: error as Error, data: null }));
        }
      }
    };
    loadData();
  }, [getData, details]);
  return (
    <>
      {state.isLoading && (
        <div className="relative">
          <div className="w-full h-full  flex justify-center  font-bold text-lg relative bg-black ">
            <p className="absolute top-[20vh] text-[2rem]">Loading...</p>
          </div>
        </div>
      )}
      <div
        className="rounded bg-white p-4 flex justify-center"
        data-testid={`details`}
      >
        <div>
          <h2 className="font-bold text-lg mb-2 underline underline-offset-1">
            {state.data?.name}
          </h2>
          {Object.keys(propertyLabels).map((property) => (
            <p key={property}>
              <span className="font-bold">
                {propertyLabels[property as keyof IPropertyLabels] as string}:
              </span>{" "}
              {`${
                state.data ? state.data[property as keyof IPropertyLabels] : ""
              }`}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Details;
