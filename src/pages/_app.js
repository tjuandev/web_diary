import GlobalStyles from "utils/styles/GlobalStyles";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
