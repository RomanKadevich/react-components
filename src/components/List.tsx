// import { useSearchParams } from "react-router-dom";

import { useRouter } from "next/router";
import { IAnimal, IPropertyLabels } from "../types/types";
// import { useDataAnimals } from "../../../src/hooks/useDataAnimals";

const propertyLabels: Record<keyof IPropertyLabels, string> = {
  earthAnimal: "Earth Animal",
  earthInsect: "Earth Insect",
  avian: "Avian",
  canine: "Canine",
  feline: "Feline",
};
export interface ISSGAnimals {
  animals: IAnimal[];
}

export const List = ({ animals }: ISSGAnimals) => {
  const router = useRouter();
  const { name } = router.query;
  const { page } = router.query as { page: string | undefined };
  const { details } = router.query;

  const detailsOpen = (detName: string) => {
    if (!details) {
      router.push({
        pathname: page,
        query: {
          name: name,
          details: detName,
        },
      });
    }
  };
  const detailsClose = () => {
    if (details) {
      router.push({
        pathname: page,
        query: {
          name: name,
        },
      });
    }
  };

  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10 mt-10 pr-[20px] pl-[20px] min-h-[60vh]`}
      data-testid={`cards`}
      onClick={() => detailsClose()}
    >
      {animals?.map((animal) => (
        <li
          className="rounded bg-white p-4 flex justify-center cursor-pointer hover:opacity-[0.9]"
          key={animal.uid}
          data-testid={`card-item`}
          onClick={() => detailsOpen(animal.name)}
        >
          <div data-testid={`card-text-list`}>
            <h2 className="font-bold text-lg mb-2 underline underline-offset-1">
              {animal.name}
            </h2>
            {Object.keys(propertyLabels).map((property) => (
              <p key={property}>
                <span className="font-bold">
                  {propertyLabels[property as keyof IPropertyLabels] as string}
                </span>
                <span>:</span>
                {`${animal[property as keyof IPropertyLabels]}`}
              </p>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
