import type { AppProps } from "next/app";
import ThemeProvider from "@/hwiui/theme/themeProvider";
import "@/hwiui/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <script type="text/javascript" src="/static/tweaker.js"></script>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
