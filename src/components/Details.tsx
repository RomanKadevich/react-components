import { IPropertyLabels } from "../types/types";
import { ISSGAnimals } from "./List";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
const propertyLabels: Record<keyof IPropertyLabels, string> = {
  earthAnimal: "Earth Animal",
  earthInsect: "Earth Insect",
  avian: "Avian",
  canine: "Canine",
  feline: "Feline",
};

const Details = ({ animals }: ISSGAnimals) => {
  const router = useRouter();
  const { name } = router.query;
  const { page } = router.query as { page: string | undefined };
  const detailsClose = () => {
    router.push({
      pathname: page,
      query: {
        name: name,
      },
    });
  };

  const data = animals[0];
  return (
    <div className="relative">
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => detailsClose()}
      >
        <AiOutlineClose />
      </div>
      <div
        className="rounded bg-white p-4 flex justify-center"
        data-testid={`details`}
      >
        <div>
          <h2 className="font-bold text-lg mb-2 underline underline-offset-1">
            {data?.name}
          </h2>
          {Object.keys(propertyLabels).map((property) => (
            <p key={property}>
              <span className="font-bold">
                {propertyLabels[property as keyof IPropertyLabels] as string}:
              </span>
              {`${data ? data[property as keyof IPropertyLabels] : ""}`}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
