import { Head, Html, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html lang="en">
      <Head />
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
