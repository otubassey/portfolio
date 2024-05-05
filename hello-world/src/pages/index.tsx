"use client";

import { memo } from "react";

import { Urbanist } from "next/font/google";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";

import { Section } from "../components/common/section";
import { Experiences } from "../components/experiences";
import { Home } from "../components/home";
import {Introduction} from "../components/introduction";
import { Location } from "../components/location";
import {NavigationFAB, NavigationList, NAVIGATION, useNavigation} from "../components/navigation";
import { Projects } from "../components/projects";
import {Skills} from "../components/skills";
import Head from "next/head";

const urbanist = Urbanist({ subsets: ["latin"] });

// root: "mx-auto max-h-screen px-6 py-8 min-w-[35rem] max-w-screen-xl md:py-0",
const CLASSNAMES = {
  root: "mx-auto px-6 py-8 min-w-[35rem] max-w-screen-xl md:py-0",
  main: {
    root: "lg:pt-24",
    skills: "md:mx-auto md:w-full md:px-0 md:py-0"
  }
} as const;


const SEO_BEST_PRACTICES_LIMIT = {
  Title: 60,
  Description: 160
} as const;

const TITLE = "Building the Future: Otu Bassey's Full-Stack Developer Portfolio";
const DESCRIPTION = "";

function mapSectionClassNames(active: boolean) {
  return {
    root: ClassesUtil.concat("block mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24", {["md:hidden"]: !active}),
    title: "text-2xl pb-5"
  };
}

function Layout() {
    // TODO: the ff before checking this in:
    // 1. type checking for TS and React Props
    // 2. check usage of div vs section
    // 3. Is it possible to simplify the number of elements from the Section component
    // 4. fix helloworld controller
    // 5. fix theme
    // 6. modal for settings
    // 7. create a single portfolio-helloworld response
    // 8. Accessibility
    // 9. Eslint checking
    // 10. create settings modal - check navigation constants file for details - add this to featurelog file
    // 11. Test cases
  const [handeleNavigate, [navigationItem, setNavigationItem]] = useNavigation(NAVIGATION.HOME);
  
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION}></meta>
      </Head>
      <div ref={setNavigationItem(NAVIGATION.HOME)} className={ClassesUtil.concat(CLASSNAMES.root, urbanist.className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:justify-between md:gap-4">
          <header className="lg:sticky lg:top-0 max-h-screen lg:justify-between lg:py-24">
            <div>
              <Introduction />
              <NavigationList
                className={{root: "hidden md:block"}}
                onNavigate={handeleNavigate}
                navigationItem={navigationItem}
              />
            </div>
            <Location />
          </header>
          <main className={CLASSNAMES.main.root}>
            <Section
              className={mapSectionClassNames(navigationItem[NAVIGATION.HOME].display)}
              hasStickyHeader
              title={NAVIGATION.HOME}>
              <Home />
            </Section>
            <Section
              ref={setNavigationItem(NAVIGATION.SKILLS)}
              className={mapSectionClassNames(navigationItem[NAVIGATION.SKILLS].display)}
              hasStickyHeader
              title={NAVIGATION.SKILLS}>
              <Skills className={CLASSNAMES.main.skills} />
            </Section>
            <Section
              ref={setNavigationItem(NAVIGATION.EXPERIENCES)}
              className={mapSectionClassNames(navigationItem[NAVIGATION.EXPERIENCES].display)}
              hasStickyHeader
              title={NAVIGATION.EXPERIENCES}>
              <Experiences />
            </Section>
            <Section
              ref={setNavigationItem(NAVIGATION.PROJECTS)}
              className={mapSectionClassNames(navigationItem[NAVIGATION.PROJECTS].display)}
              hasStickyHeader
              title={NAVIGATION.PROJECTS}>
              <Projects />
            </Section>
          </main>
          <footer>
            <NavigationFAB onNavigate={handeleNavigate} />
          </footer>
        </div>
      </div>
    </>
  );
}

export default memo(withDisplayName()(Layout));
