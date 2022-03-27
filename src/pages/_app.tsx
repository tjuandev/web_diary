import GlobalStyles from "utils/styles/GlobalStyles";

import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log("aaaaaaaaaaaaaaaaaaa");

  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
