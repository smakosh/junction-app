import App, { AppProps, AppContext } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import GlobalStyle from "theme/global-style";
import "nprogress/nprogress.css";
import UserProvider from "providers/UserProvider";
// import { ThemeProvider } from "styled-components";
// import theme from "theme/config";

Router.events.on("routeChangeStart", () => {
	NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => (
	<>
		<GlobalStyle />
		<UserProvider>
			<Component {...pageProps} />
		</UserProvider>
	</>
);

MyApp.getInitialProps = async (ctx: AppContext) => {
	const pageProps = await App.getInitialProps(ctx);

	return { pageProps };
};

export default MyApp;
