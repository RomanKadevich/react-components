import { useEffect } from "react";
import { useRouter } from "next/router";
const Main = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/1");
  }, [router]);

  return <></>;
};

export default Main;
