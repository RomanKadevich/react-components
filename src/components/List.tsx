// import { useSearchParams } from "react-router-dom";

import { IAnimal, IPropertyLabels } from "../../../src/types/types";
// import { useDataAnimals } from "../../../src/hooks/useDataAnimals";

const propertyLabels: Record<keyof IPropertyLabels, string> = {
  earthAnimal: "Earth Animal",
  earthInsect: "Earth Insect",
  avian: "Avian",
  canine: "Canine",
  feline: "Feline",
};
interface ISSGAnimals {
  animals: IAnimal[];
}

export const List = ({ animals }: ISSGAnimals) => {
  // const { data } = useDataAnimals();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const details = searchParams.get("details") || "";
  // const name = searchParams.get("name") || "";
  // const watchDetails = (serachTitle: string = details) => {
  //   setSearchParams({ name: name, details: serachTitle });
  // };

  return (
    <ul
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10 mt-10 pr-[20px] pl-[20px] min-h-[60vh]"
      data-testid={`cards`}
    >
      {animals?.map((animal) => (
        <li
          className="rounded bg-white p-4 flex justify-center cursor-pointer hover:opacity-[0.9]"
          key={animal.uid}
          // onClick={() => {
          //   watchDetails(animal.name);
          // }}
          data-testid={`card-item`}
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
