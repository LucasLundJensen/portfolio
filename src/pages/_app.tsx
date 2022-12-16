import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navigation/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute="class" defaultTheme="light">
			<div className="flex flex-col bg-white dark:bg-dark-gray">
				<Navbar />
				<div className="w-11/12 xl:w-9/12 2xl:w-7/12 mx-auto">
					<Component {...pageProps} />
				</div>
			</div>
		</ThemeProvider>
	);
}

export default MyApp;
