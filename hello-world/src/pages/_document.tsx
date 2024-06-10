import { Head, Html, Main, NextScript } from "next/document";

import { withDisplayName } from "@/ui/decorator";

function Document() {
  return (
    <Html lang="en">
      <Head />
        <body className="theme-dark bg-paper flex flex-col justify-self-stretch h-screen w-screen text-primary">
          <Main />
          <NextScript />
        </body>
    </Html>
  );
}

export default withDisplayName()(Document);
