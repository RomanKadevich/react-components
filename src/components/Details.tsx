import { IPropertyLabels } from "../../../src/types/types";
import { useDataDetails } from "../../../src/hooks/useDataDetails";

const propertyLabels: Record<keyof IPropertyLabels, string> = {
  earthAnimal: "Earth Animal",
  earthInsect: "Earth Insect",
  avian: "Avian",
  canine: "Canine",
  feline: "Feline",
};

const Details = () => {
  const { data, error, isLoading } = useDataDetails();

  return (
    <>
      {isLoading && (
        <div className="relative">
          <div className="w-full h-full  flex justify-center  font-bold text-lg relative bg-black ">
            <p
              className="absolute top-[20vh] text-[2rem]"
              data-testid={"details-loader"}
            >
              Loading...
            </p>
          </div>
        </div>
      )}
      <div
        className="rounded bg-white p-4 flex justify-center"
        data-testid={`details`}
      >
        <div>
          {error ? (
            <div className="bg-white p-3 text-center text-red-500 font-bold">
              Error when loading data {"error" in error ? error.error : ""}
            </div>
          ) : null}
          <h2 className="font-bold text-lg mb-2 underline underline-offset-1">
            {data?.name}
          </h2>
          {Object.keys(propertyLabels).map((property) => (
            <p key={property}>
              <span className="font-bold">
                {propertyLabels[property as keyof IPropertyLabels] as string}:
              </span>{" "}
              {`${data ? data[property as keyof IPropertyLabels] : ""}`}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Details;
