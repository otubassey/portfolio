"use client";

import { memo, useCallback, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Carousel from "../../../ui/widgets/carousel/carousel";
import CarouselContent from "../../../ui/widgets/carousel/carouselContent";
import Controller, {ON_CHANGE_STATUS} from "./controller";
import SnippetPanel from "./snippetPanel";

import {useRefs} from "@/pages/ui/hooks";
import { Skill } from "../../skills/skill.types";
import { withDisplayName } from "@/pages/ui/decorator";
import { CODE_SNIPPETS } from "./helloWorldSnippets.constants";
import { ClassesUtil } from "@/pages/ui/utils";

const CLASSNAMES = {
    root: "flex flex-col gap-1 h-[26rem] md:gap-4"
} as const;

type HelloWorldSnippetsProps = {
    className?: string,
    values: ReadonlyArray<Skill>
};

let tweenStart = null;
let tweenEnd = null;
let tweenStaggeredStart = null;
let tweenStaggeredEnd = null;

function HelloWorldSnippets({className, values}: HelloWorldSnippetsProps) {
    const [carouselContentListRefs, setCarouselContentListRefs] = useRefs();
    const [tween, setTween] = useState<gsap.core.Tween | null>(null);
    const [isTweenActive, toggleIsTweenActive] = useState<boolean>(false);
    
    const languagesWithNoSnippets = values.filter(tech => CODE_SNIPPETS.every(snippet => (snippet.language !== tech.name)));

    useGSAP(() => {
        const incrementIndex = (index: number): number => (index + 1);
        const isIndexWithinValidRange = (index: number, maxCount: number): boolean => (index !== -1 && incrementIndex(index) <= maxCount);

        const tween = gsap.fromTo(carouselContentListRefs.current!,
            {
                y: 10,
                x: 0,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 4,
                onStart: () => {
                    toggleIsTweenActive(true);
                },
                onComplete: function() {
                    toggleIsTweenActive(false);
                },
                stagger: {
                    each: 5,
                    onStart: function() {
                    },
                    onComplete: function() {
                        const completedStaggeredCarouselContent = Array.isArray(this.targets()) ? this.targets()[0] : null;
                        const currentIndex = carouselContentListRefs.current!.findIndex(element => element === completedStaggeredCarouselContent);
                        if(isIndexWithinValidRange(currentIndex, carouselContentListRefs.current!.length)) {
                            const isLastIndex = carouselContentListRefs.current!.length === incrementIndex(currentIndex);
                            const nextPotentialIndex = isLastIndex ? 0 : incrementIndex(currentIndex);
                            const nextCarouselContentToBeStaggered = carouselContentListRefs.current![nextPotentialIndex];
                            if(completedStaggeredCarouselContent) {
                                gsap.set(completedStaggeredCarouselContent, {display: "none"});
                            }
                            if(nextCarouselContentToBeStaggered) {
                                gsap.set(nextCarouselContentToBeStaggered, {display: "block"});
                            }
                        }
                    }
                }
            }
        );
        setTween(tween);
    }, []);

    const handleControllerChange = useCallback((_, action) => {
        if(action === ON_CHANGE_STATUS.PAUSE) {
            tween?.pause();
        }
        if(action === ON_CHANGE_STATUS.PLAY) {
            tween?.resume();
        }
        if(action === ON_CHANGE_STATUS.RESTART) {
            if(tween && !tween.isActive()) {
                tween.restart();
            }
        }
    }, [tween]);

    const handleControllerNext = useCallback(() => {
        
    }, [tween]);

    const handleControllerPrevious = useCallback(() => {
    }, [tween]);

    return (
        // <div className={ClassesUtil.concat("grid grid-cols-1 grid-rows-12 gap-1 max-h-[30rem] md:gap-4", className)}>
        <div className={ClassesUtil.concat("grid grid-cols-1 gap-1 md:gap-4", className)}>
            {/* <div className="w-full max-h-10">

            </div> */}
            <Carousel
                className="h-96"
                controller={
                    <Controller
                        active={isTweenActive}
                        onChange={handleControllerChange}
                        onNext={handleControllerNext}
                        onPrevious={handleControllerPrevious}
                    />
                }>
                {
                    CODE_SNIPPETS.map((codeSnippet, index) => (
                        <CarouselContent
                            key={codeSnippet.language}
                            ref={setCarouselContentListRefs(index)}
                            display="tint">
                            <SnippetPanel
                                language={codeSnippet.language}
                                tabs={codeSnippet.tabs}
                            />
                        </CarouselContent>
                    ))
                }
            </Carousel>
            {
                languagesWithNoSnippets?.length > 0 &&
                <div className="p-1 w-full h-fit">
                    <p>Languages with missing code snippets</p>
                    <p>{languagesWithNoSnippets.map(language => (language.name)).join(", ")}</p>
                </div>
            }
        </div>
    );
}

export default memo(withDisplayName<HelloWorldSnippetsProps>()(HelloWorldSnippets));
