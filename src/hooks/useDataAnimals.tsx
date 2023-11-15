import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { apiBaseUrl, pageSize } from "../api-service/api_env";
import { useContext, useEffect } from "react";
import { stateContext } from "../components/ContextProvider";
import { Api } from "../api-service/api";

export const useDataAnimals = () => {
  const { page } = useParams();
  const { appList, updateAppList } = useContext(stateContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const name = searchParams.get("name");
  const details = searchParams.get("details");

  useEffect(() => {
    const apiService = new Api(apiBaseUrl);
    const loadData = async () => {
      try {
        updateAppList({ isLoading: true });

        const lastQueryData: string | null = localStorage.getItem("lastQuery");
        let queryData = "";

        if (lastQueryData) {
          queryData = lastQueryData;
        }

        const animals = await apiService.getItems(page, pageSize, queryData);

        updateAppList({
          data: animals.animals,
          error: null,
          isLoading: false,
          pageNumber: animals.page.totalPages,
        });
      } catch (error) {
        if (error instanceof Error) {
          updateAppList({ error: error as Error, data: [] });
        }
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, searchParams, page]);

  return {
    data: appList.data,
    loading: appList.isLoading,
    error: appList.error,
    page: page,
    searchParamsName: name,
    searchParamsDetails: details,
  };
};
