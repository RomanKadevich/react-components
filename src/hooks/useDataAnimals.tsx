import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useSearchAnimalsQuery } from "../store/api/animals";
import { IAnimal } from "../types/types";

export const useDataAnimals = () => {
  const [list, setList] = useState<IAnimal[] | undefined>([]);
  const { page } = useParams();

  const [searchParams] = useSearchParams();
  const value = useSelector<RootState, string>((state) => state.value.value);

  const name = searchParams.get("name");
  const details = searchParams.get("details");
  const lastQueryData: string | null = localStorage.getItem("lastQuery");
  const queryData = lastQueryData ? lastQueryData : value ? value : "";
  const { data, isLoading, error } = useSearchAnimalsQuery({
    search: queryData,
    page: page ?? "0",
  });
  useEffect(() => {
    setList(data);
  }, [data]);

  return {
    data: list,
    loading: isLoading,
    error: error,
    page: page,
    searchParamsName: name,
    searchParamsDetails: details,
  };
};
