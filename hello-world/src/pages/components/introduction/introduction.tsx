"use client";

import { memo, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { withDisplayName } from "@/pages/ui/decorator";
import { Title } from "@/pages/ui/widgets/title";
import {Characters} from "@/pages/ui/widgets/typography";
import { ClassesUtil } from "@/pages/ui/utils";

const CLASSSNAMES = {
    firstName: "block text-slate-300",
    h1: "mb-6 font-extrabold leading-none tracking-tighter",
    // jobTitle: "block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text font-bold uppercase tracking-[.2em] text-transparent opacity-0",
    // jobTitle: "block bg-gradient-to-tr from-[#827660] via-[#9B917F] to-[#827660] bg-clip-text font-bold uppercase tracking-[.2em] text-transparent opacity-0",
    jobTitle: "block bg-gradient-to-tr from-[#4d432f] via-[#cbbea6] to-[#4d432f] bg-clip-text font-bold uppercase tracking-[.2em] text-transparent opacity-0",
    lastName: "-mt-[.2em] block text-slate-500"
} as const;

const FIRST_NAME = "Otu";
const LAST_NAME = "Bassey";
const JOB_TITLE = "Senior Full-Stack Developer";
const INTRODUCTION = `I'm a highly motivated and results-oriented ${JOB_TITLE} with over 8 years of experience designing, `
+ "developing, and deploying robust web applications. I possess a strong command of both front-end and back-end technologies, enabling "
+ "me to deliver exceptional user experiences while ensuring efficient and scalable solutions.";

const NAME_ANIMATION = {
    From: {
            x: -100,
            opacity: 0,
            rotate: -10 
        } as gsap.TweenVars,
    To: {
            x: 0,
            opacity: 1,
            rotate: 0,
            ease: "elastic.out(1, 0.3)",
            duration: 1,
            transformOrigin: "left top",
            stagger: {
                each: 0.1,
                from: "random"
            }
        } as gsap.TweenVars
} as const;

function Introduction() {
    const firstNameCharacterRefs = useRef([]);
    const lastNameCharacterRefs = useRef([]);
    const jobPositionRef = useRef(null);
    const introductionRef = useRef(null);

    useGSAP(() => {
        const animatedTextTimeline = gsap.timeline();
        animatedTextTimeline.fromTo(
            firstNameCharacterRefs.current,
            NAME_ANIMATION.From,
            NAME_ANIMATION.To
        );
        animatedTextTimeline.fromTo(
            lastNameCharacterRefs.current,
            NAME_ANIMATION.From,
            NAME_ANIMATION.To
        );
        animatedTextTimeline.fromTo(
            jobPositionRef.current,
            {
                y: 20,
                opacity: 0,
                scale: 1.2
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scale: 1,
                ease: "elastic.out(1, 0.3)"
            }
        );
        animatedTextTimeline.fromTo(
            introductionRef.current,
            {
                y: 20,
                opacity: 0,
                scale: 1.2
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scale: 1,
                ease: "elastic.out(1, 0.3)"
            }
        );
    }, []);

    return (
        <div>
            <Title aria-label="I'm" variant="h3">I'm</Title>
            <Title aria-label={[FIRST_NAME, LAST_NAME].join(" ")} className={CLASSSNAMES.h1} variant="h1">
                <span className={CLASSSNAMES.firstName}>
                    <Characters ref={firstNameCharacterRefs} text={FIRST_NAME} />
                </span>
                <span className={CLASSSNAMES.lastName}>
                    <Characters ref={lastNameCharacterRefs} text={LAST_NAME} />
                </span>
            </Title>
            <Title
                ref={jobPositionRef}
                aria-label={`a ${JOB_TITLE}`}
                className={ClassesUtil.concat(CLASSSNAMES.jobTitle)}
                variant="h3">
                {JOB_TITLE}
            </Title>
            <p ref={introductionRef} className="opacity-0 text-wrap" aria-description={INTRODUCTION}>{INTRODUCTION}</p>
        </div>
    );
}

export default memo(withDisplayName()(Introduction));
