import List from "@/components/List";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Api } from "@/api-service/api";
import { apiBaseUrl } from "../../../src/store/api/api_env";
import Pagination from "@/components/Pagination";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  useEffect(() => {
    // const lastQueryData: string | null = localStorage.getItem("lastQuery");
    // if (!lastQueryData) {
    //   navigate("/1");
    // }
    router.push("/1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { page } = router.query;
  console.log(page);
  return (
    <>
      <List animals={data.animals}></List>
      <Pagination
        pageIndex={page ? +page : 1}
        pageNumber={data.page.totalPages ?? 1}
      ></Pagination>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { page } = context.params as { page: string | undefined };
  // console.log(page)
  const api = new Api(apiBaseUrl);
  // const router = useRouter()
  // const {pathname}= router;
  // const res = await fetch(
  //   "https://stapi.co/api/v1/rest/animal/search?pageSize=12&pageNumber=0",
  //   { method: "POST" },
  // );
  // const data: IAnimals = await res.json();
  const data = await api.getItems("", page, 12);
  return {
    props: {
      data: data,
      // context:x,
    },
  };
}
