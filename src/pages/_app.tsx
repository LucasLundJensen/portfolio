import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navigation/Navbar";
import { appWithTranslation } from "next-i18next";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute="class" defaultTheme="light">
			<div className="flex flex-col bg-gray-100 dark:bg-dark-gray whitespace-pre-line">
				<Navbar />
				<div className="w-11/12 xl:w-9/12 2xl:w-7/12 mx-auto">
					<Component {...pageProps} />
				</div>
				<Analytics />
			</div>
		</ThemeProvider>
	);
}

export default appWithTranslation(MyApp, nextI18NextConfig);
