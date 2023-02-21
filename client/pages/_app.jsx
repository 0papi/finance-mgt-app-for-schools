import "../styles/globals.css";
import { Inter } from "@next/font/google";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <main className={`${inter.variable}`}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
