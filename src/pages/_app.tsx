import App, { AppProps, AppContext } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import GlobalStyle from "theme/global-style";
import "nprogress/nprogress.css";
import { AnimatePresence, motion } from "framer-motion";
// import { ThemeProvider } from "styled-components";
// import theme from "theme/config";

Router.events.on("routeChangeStart", () => {
	NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps, router }: AppProps) => (
	<>
		<GlobalStyle />
		<AnimatePresence exitBeforeEnter>
			<motion.div
				key={router.route}
				initial="pageInitial"
				animate="pageAnimate"
				variants={{
					pageInitial: {
						opacity: 0,
					},
					pageAnimate: {
						opacity: 1,
					},
				}}
			>
				<Component {...pageProps} key={router.route} />
			</motion.div>
		</AnimatePresence>
	</>
);

MyApp.getInitialProps = async (ctx: AppContext) => {
	const pageProps = await App.getInitialProps(ctx);

	return { pageProps };
};

export default MyApp;
