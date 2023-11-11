import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { MockAnimal } from "./moks";

export const Path =
  "https://stapi.co/api/v1/rest/animal/search/?&pageNumber=1&pageSize=12";

// const test = "http://test";

// const res = {
//   animals: mock,
//   page: {
//     pageNumber: 1,
//     pageSize: 12,
//     numberOfElements: 50,
//     totalElements: 2404,
//     totalPages: 49,
//     firstPage: true,
//     lastPage: false,
//   },
// };

export const server = setupServer(
  http.post(Path, () => {
    return HttpResponse.json(MockAnimal);
  }),
);
server.events.on("request:start", ({ request }) => {
  if (request.method === "POST") {
    console.log(request.json);
  } else {
    console.log("noOK");
  }
});
