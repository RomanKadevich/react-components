import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { mock, mockDetails } from "./moks";

const CardsPath =
  "https://stapi.co/api/v1/rest/animal/search/?&pageNumber=1&pageSize=12";

export const DetailsPath =
  "https://stapi.co/api/v1/rest/animal/search/?&name=Albatross";

export const server = setupServer(
  http.post(CardsPath, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");
    const pageSize = url.searchParams.get("pageSize");
    const pageNumber = url.searchParams.get("pageNumber");
    const mockData = mock.filter((_, i) => i < Number(pageSize));
    const badQuery = "fwefqweqwef";
    const res =
      name === badQuery
        ? {
            animals: [],
            page: {
              pageNumber: pageNumber,
              pageSize: pageSize,
              numberOfElements: 0,
              totalElements: 0,
              totalPages: 0,
              firstPage: true,
              lastPage: true,
            },
          }
        : {
            animals: mockData,
            page: {
              pageNumber: pageNumber,
              pageSize: pageSize,
              numberOfElements: 50,
              totalElements: 2404,
              totalPages: 49,
              firstPage: true,
              lastPage: false,
            },
          };

    return HttpResponse.json(res);
  }),

  http.post(DetailsPath, () => {
    const res = {
      animals: mockDetails,
      page: {
        pageNumber: 0,
        pageSize: 50,
        numberOfElements: 1,
        totalElements: 1,
        totalPages: 1,
        firstPage: true,
        lastPage: true,
      },
    };

    return HttpResponse.json(res);
  }),
);
