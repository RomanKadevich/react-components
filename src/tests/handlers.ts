import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { mock } from "./moks";

export const Path =
  "https://stapi.co/api/v1/rest/animal/search/?&pageNumber=1&pageSize=12";

// const test = "http://test";

export const server = setupServer(
  http.post(Path, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");
    const pageSize = url.searchParams.get("pageSize");
    const pageNumber = url.searchParams.get("pageNumber");
    const mockData = mock.filter((_, i) => i < Number(pageSize));
    const res = name
      ? {
          animals: null,
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
);
// server.events.on("request:start", ({ request }) => {
//   if (request.method === "POST") {
//     console.log(request.json);
//   } else {
//     console.log("noOK");
//   }
// });
