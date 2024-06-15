"use client";

import { useCallback, useState } from "react";

import { Urbanist } from "next/font/google";
import Head from "next/head";

import { Settings } from "@/components/settings";
import { ConfigurationContextProvider } from "@/ui/context/configuration";
import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";
import { Section } from "@/ui/widgets/section";

import { Experiences } from "../components/experiences";
import { Home } from "../components/home";
import {Introduction} from "../components/introduction";
import { LocateMeAt } from "../components/locateMeAt";
import {NavigationFAB, NavigationList, NAVIGATION, useNavigation} from "../components/navigation";
import { Projects } from "../components/projects";
import {Skills} from "../components/skills";

const urbanist = Urbanist({ subsets: ["latin"] });

const CLASSNAMES = {
  root: "px-6 py-8 md:py-0",
  main: {
    root: "lg:pt-24",
    skills: "md:mx-auto md:w-full md:px-0 md:py-0"
  }
} as const;

const SEOBestPracticeLimits = {
  TITLE: 60,
  DESCRIPTION: 170
} as const;

const TITLE = "Building the Future: Otu's Full-Stack Developer Portfolio"; // 4 over
const DESCRIPTION = "Skilled Full-Stack Developer with expertise in Javascript (Angular, React), Java, & Spring Framework. " +
"I design, develop, & deploy full-stack web applications. My portfolio showcases projects that bridge the gap between user interaction & " +
"server-side logic, ensuring a seamless user experience.";

function mapSectionClassNames(active: boolean) {
  return {
    root: ClassesUtil.concat("block mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24", {["md:hidden"]: !active}),
    title: "text-2xl pb-5"
  };
}

function MainAppContainerComponent() {
  const [{count, name}, setData] = useState({count: 0, name: null});
  const [handleNavigate, [navigationItem, setNavigationItem]] = useNavigation(NAVIGATION.HOME, sectionName => {
    setData(prev => ({count: prev.count + 1, name: sectionName}))
  });

  const handleCloseSettingsDialog = useCallback(() => {
    handleNavigate(NAVIGATION.SETTINGS);
  }, [handleNavigate]);

  return (
    <div ref={setNavigationItem(NAVIGATION.HOME)} className={ClassesUtil.concat("theme-dark", CLASSNAMES.root, urbanist.className)}>
      <div className="border border-red-400 fixed">{`${name} just got scrolled into view. scroll into view count: ${count}`}</div>
      <div className={`${navigationItem[NAVIGATION.SETTINGS].display ? "hidden" : "grid"} grid-cols-1 md:grid-cols-2 md:justify-between md:gap-4 sm:grid`}>
        <header className="lg:sticky lg:top-0 max-h-screen lg:justify-between lg:py-24">
          <Introduction />
          <NavigationList
            className={{root: "hidden md:block"}}
            onNavigate={handleNavigate}
            navigationItem={navigationItem}
          />
          <LocateMeAt />
        </header>
        <main className={CLASSNAMES.main.root}>
          <Section
            classes={mapSectionClassNames(navigationItem[NAVIGATION.HOME].display)}
            elevation="sm"
            hasStickyHeader
            title={NAVIGATION.HOME}>
            <Home />
          </Section>
          <Section
            classes={mapSectionClassNames(navigationItem[NAVIGATION.SKILLS].display)}
            elevation="sm"
            hasStickyHeader
            ref={setNavigationItem(NAVIGATION.SKILLS)}
            title={NAVIGATION.SKILLS}>
            <Skills className={CLASSNAMES.main.skills} />
          </Section>
          <Section
            classes={mapSectionClassNames(navigationItem[NAVIGATION.EXPERIENCES].display)}
            elevation="sm"
            hasStickyHeader
            ref={setNavigationItem(NAVIGATION.EXPERIENCES)}
            title={NAVIGATION.EXPERIENCES}>
            <Experiences />
          </Section>
          <Section
            classes={mapSectionClassNames(navigationItem[NAVIGATION.PROJECTS].display)}
            elevation="sm"
            hasStickyHeader
            ref={setNavigationItem(NAVIGATION.PROJECTS)}
            title={NAVIGATION.PROJECTS}>
            <Projects />
          </Section>
        </main>
        <footer>
          <NavigationFAB onNavigate={handleNavigate} />
        </footer>
      </div>

      <Settings open={navigationItem[NAVIGATION.SETTINGS].display} onClose={handleCloseSettingsDialog} />
    </div>
  );
}

const MainAppContainer = withDisplayName("Layout")(MainAppContainerComponent);

function Layout() {
    // TODO: the ff before checking this in:
    // 1. type checking for TS and React Props
    // 2. check usage of div vs section
    // 3. Is it possible to simplify the number of elements from the Section component
    // 4. fix theme
    // 5. create a single portfolio-helloworld response
    // 6. Accessibility
    // 7. Eslint checking
    // 8. add site history to settings modal - check navigation constants file for details - add this to featurelog file
    // 9. Test cases

  return (
    <>
      <Head>
        <title>{TITLE.length > SEOBestPracticeLimits.TITLE ? "Title is longer than recommendation" : TITLE}</title>
        <meta
          name="description"
          content={DESCRIPTION.length > SEOBestPracticeLimits.DESCRIPTION ? "Description is longer than recommendation" : DESCRIPTION}>
        </meta>
      </Head>
      
      <ConfigurationContextProvider>
        <MainAppContainer />
      </ConfigurationContextProvider>
    </>
  );
}

export default withDisplayName()(Layout);
