import GlobalStyles from "utils/styles/GlobalStyles";

import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
