import { SessionProvider } from "next-auth/react";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import "../src/styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
