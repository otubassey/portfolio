import { Company, Exprience } from "./experiences.types";
import {Technologies} from "@/pages/components/skills";

const {
    ELECTRON_JS,
    EXPRESS_JS, JAVA,
    JAVASCRIPT,
    JPA,
    NODE_JS,
    REACT,
    SPRING_BOOT,
} = Technologies;

const charterCommunication: Company = {
    name: "Charter Communications",
    externalLink: {
        rel: "Charter Communications",
        href: "https://corporate.charter.com/"
    },
    location: "Maryland Heights, MO"
} as const;

export const EXPERIENCES: Array<Exprience> = [
    {
        id: 1,
        company: charterCommunication,
        isCurrent: true,
        positions: [
            {
                title: "Senior Application Developer",
                from: "Oct. 2021",
                to: "Present"
            },
            {
                title: "Senior Developer III",
                from: "Jul 2017",
                to: "Oct. 2021"
            }
        ],
        technologies: [ELECTRON_JS, EXPRESS_JS, JAVA, JAVASCRIPT, NODE_JS, REACT, SPRING_BOOT]
    },
    {
        id: 2,
        company: {
            name: "Association of American Medical Colleges (AAMC)",
            externalLink: {
                rel: "AAMC",
                href: "https://www.aamc.org/"
            },
            location: "Washington, DC"
        },
        isCurrent: false,
        positions: [
            {
                title: "Senior Developer III",
                from: "",
                to: ""
            }
        ],
        technologies: [ELECTRON_JS, EXPRESS_JS, JAVA, JAVASCRIPT, NODE_JS, REACT, SPRING_BOOT]
    },
    {
        id: 3,
        company: charterCommunication,
        isCurrent: false,
        positions: [
            {
                title: "FullStack Developer",
                from: "",
                to: ""
            }
        ],
        technologies: [ELECTRON_JS, EXPRESS_JS, JAVA, JAVASCRIPT, NODE_JS, REACT, SPRING_BOOT]
    },
    {
        id: 4,
        company: {
            name: "PayChex Inc.",
            externalLink: {
                rel: "PayChex Inc.",
                href: "https://www.paychex.com/home"
            },
            location: "Webster, NY"
        },
        isCurrent: false,
        positions: [
            {
                title: "FullStack Developer",
                from: "",
                to: ""
            }
        ],
        technologies: [ELECTRON_JS, EXPRESS_JS, JAVA, JAVASCRIPT, NODE_JS, REACT, SPRING_BOOT]
    }
] as const;
