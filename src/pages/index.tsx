import List from "@/components/List";
import { InferGetServerSidePropsType } from "next";
import { IAnimals } from "../../../src/types/types";

export default function Home({
  animals,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <List animals={animals}></List>
    </>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    "https://stapi.co/api/v1/rest/animal/search?pageSize=12&pageNumber=0",
    { method: "POST" },
  );
  const data: IAnimals = await res.json();
  return {
    props: {
      animals: data.animals,
    },
  };
}
