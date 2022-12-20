import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navigation/Navbar";
import { appWithTranslation } from "next-i18next";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute="class" defaultTheme="light">
			<div className="flex flex-col bg-white dark:bg-dark-gray whitespace-pre-line">
				<Navbar />
				<div className="w-11/12 xl:w-9/12 2xl:w-7/12 mx-auto">
					<Component {...pageProps} />
				</div>
			</div>
		</ThemeProvider>
	);
}

// export async function getStaticProps(context: GetStaticPropsContext) {
// 	// Return props to page.
// 	return {
// 		props: {
// 			...(await serverSideTranslations(context.locale!, ["navbar"])),
// 		},
// 		// revalidate: 1000, // Regenerate the page on new request if it hasn't been updated X amount of seconds.
// 	};
// }

export default appWithTranslation(MyApp);
