import { useEffect } from "react";
import { useRouter } from "next/router";
const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push("/"), 4000);
  }, [router]);

  return (
    <>
      <div
        className="w-full h-[100vh] flex flex-col justify-center items-center font-bold text-[40px] text-red-800"
        data-testid="404"
      >
        404 - Page not found
        <p>Redirect to main page in 4 seconds... </p>
      </div>
    </>
  );
};

export default NotFound;
