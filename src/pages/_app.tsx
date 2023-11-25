import { MyErrorBoundary } from "@/components/errorBoundary";
import Layout from "@/components/layout";
import { wrapper } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, ...rest }: AppProps) {
  const {
    store,
    props: { pageProps },
  } = wrapper.useWrappedStore(rest);
  console.log(store);
  return (
    <MyErrorBoundary>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </MyErrorBoundary>
  );
}
