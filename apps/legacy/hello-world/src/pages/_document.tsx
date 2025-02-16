import { Head, Html, Main, NextScript } from "next/document";

import { displayName } from "@/hwiui/decorator";

function Document() {
  console.log("tagged-Document");
  return (
    <Html lang="en" className="">
      <Head />
      {/* <body className="theme-dark bg-paper flex flex-col justify-self-stretch h-screen w-screen text-primary"> */}
      <body className="dark bg-main overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default displayName()(Document);
