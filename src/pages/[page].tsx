import List from "@/components/List";
import Pagination from "@/components/Pagination";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Details from "@/components/Details";
import {
  getRunningQueriesThunk,
  getSearchAnimals,
  useGetSearchAnimalsQuery,
} from "@/store/api/animals";
import { wrapper } from "@/store";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = router.query.page as string | undefined;
  const details = router.query.details as string | undefined;
  const name = router.query.name as string | undefined;
  const result = useGetSearchAnimalsQuery({
    search: name ? name : "",
    page: page ? page : "",
  });
  const detailsResult = useGetSearchAnimalsQuery({
    search: details ? details : "",
    page: page ? page : "",
  });
  const { data } = result;
  const { data: detailsData } = detailsResult;

  return (
    <>
      {data && (
        <div className={`flex`}>
          <div className={`${details ? "basis-1/2 blur-sm" : "basis-full"}`}>
            {<List animals={data.animals}></List>}
            {
              <Pagination
                pageIndex={page ? +page : 1}
                pageNumber={data.page.totalPages ?? 1}
              ></Pagination>
            }
          </div>
          {details && detailsData && (
            <div className="flex justify-center basis-1/2 mt-10">
              <Details animals={detailsData.animals}></Details>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const firstPage = "1";
    const { page } = context.params as { page: string | undefined };
    const { name } = context.query as { name: string | undefined };
    const { details } = context.query as { details: string | undefined };

    if (details) {
      store.dispatch(
        getSearchAnimals.initiate({ search: details, page: firstPage }),
      );
    } else {
      store.dispatch(
        getSearchAnimals.initiate({
          search: name ? name : "",
          page: page ? page : firstPage,
        }),
      );
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  },
);
