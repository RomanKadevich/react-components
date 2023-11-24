import { useRouter } from "next/router";
import { HandlerButtonType } from "../../../src/types/types";

interface IPagination {
  pageIndex: number;
  pageNumber: number;
}

const Pagination = ({ pageIndex, pageNumber }: IPagination) => {
  const router = useRouter();
  // const [searchParams, setSearchParams] = useSearchParams();
  const { page } = router.query;
  console.log(page);
  // const navigate = useNavigate();
  let pages = [];

  if (pageNumber) {
    pages = new Array(pageNumber).fill(0).map((item, index) => {
      item = index + 1;
      return item;
    });
  }

  const handlePagination: HandlerButtonType = (event) => {
    const target = event.target as HTMLElement;
    if (target.textContent) {
      // const lastQuery: string | null = localStorage.getItem("lastQuery");
      // searchParams.set("name", lastQuery ? lastQuery : "");
      // setSearchParams(searchParams);
      // navigate(`/${+target.textContent}` + "?" + searchParams);
      router.push(`${+target.textContent}`);
    }
  };

  const handlePrev = () => {
    if (page) {
      if (+page > 1) {
        // navigate(`/${+page - 1}` + "?" + searchParams);
        router.push(`${+page - 1}`);
      }
    } else {
      router.push(`/`);
      // navigate(`/`);
    }
  };

  const handleNext = () => {
    if (page) {
      if (+page < pageNumber) {
        router.push(`${+page + 1}`);
        // navigate(`/${+page + 1}` + "?" + searchParams);
      }
    } else {
      router.push(`/`);
      // navigate(`/`);
    }
  };

  return (
    <ul className="container mx-auto flex justify-center flex-wrap gap-3 p-[20px]">
      <button onClick={handlePrev} className="cursor-pointer hover:opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>
      </button>
      {pages.map((item, index) => (
        <li
          data-testid={`pagBtn-${index}`}
          className={
            (item === pageIndex ? ` bg-violet-500` : ``) +
            ` cursor-pointer p-1.5 rounded`
          }
          key={(Date.now() * Math.random()).toString()}
          onClick={handlePagination}
        >
          {item}
        </li>
      ))}
      <button
        onClick={handleNext}
        className="cursor-pointer hover:opacity-60"
        data-testid={`next`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </button>
    </ul>
  );
};

export default Pagination;
