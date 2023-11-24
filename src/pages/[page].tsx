import List from "@/components/List";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Api } from "@/api-service/api";
import { apiBaseUrl } from "../../../src/store/api/api_env";
import Pagination from "@/components/Pagination";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Details from "@/components/Details";

export default function Home({
  data,
  dataDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  useEffect(() => {
    router.push("/1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { page } = router.query;
  const { details } = router.query;
  console.log(page);
  return (
    <>
      <div className={`flex`}>
        <div className={`${details ? "basis-1/2 blur-sm" : "basis-full"}`}>
          <List animals={data.animals}></List>
          <Pagination
            pageIndex={page ? +page : 1}
            pageNumber={data.page.totalPages ?? 1}
          ></Pagination>
        </div>
        {details && (
          <div className="flex justify-center items-center basis-1/2">
            <Details animals={dataDetails.animals}></Details>
          </div>
        )}
      </div>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { page } = context.params as { page: string | undefined };
  const { name } = context.query as { name: string | undefined };
  const { details } = context.query as { details: string | undefined };
  const api = new Api(apiBaseUrl);

  const data = await api.getItems(name, page, 12);
  const dataDetails = await api.getItems(details, "1", 12);
  return {
    props: {
      data: data,
      dataDetails: dataDetails,
    },
  };
}
