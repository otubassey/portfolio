import { Html, Head, Main, NextScript } from "next/document";

const SEO_BEST_PRACTICES_LIMIT = {
  Title: 60,
  Description: 160
} as const;

const TITLE = "Building the Future: Otu Bassey's Full-Stack Developer Portfolio";
const DESCRIPTION = "";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION}></meta>
      </Head>
      {/* <body className="theme-light bg-paper text-primary"> */}
      <body className="theme-dark bg-paper text-primary">
      {/* <body className="bg-slate-900 text-slate-100"> */}
        <span className="text-red-700">Validate limits and show alert!!</span>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
