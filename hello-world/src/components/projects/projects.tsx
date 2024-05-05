import { memo } from "react";

import { Technologies } from "@/components/skills";
import { Card, CardTextHeader, CardTextContent, CardFooter } from "@/ui/widgets/card";
import { Chip } from "@/ui/widgets/chip";
import { ICON_NAMES, IconButton} from "@/ui/widgets/icon";
import { Link, LinkType } from "@/ui/widgets/link";
import { List, ListItemButton, ListItemText } from "@/ui/widgets/list";
import { Title } from "@/ui/widgets/title";

const {REACT, TYPESCRIPT} = Technologies;

const CLASSNAMES = {
    card: {
        root: "my-2 cursor-pointer first:mt-0 last:mb-0 shadow-none",
        header: {
            paragraph: "py-1 remove(py-3)",
            primary: "mr-8 text-lg font-bold uppercase tracking-widest text-slate-200",
            secondary: "block text-slate-500"
        },
        content: {
            root: "my-3",
            chip: "border-sky-300 mr-2 mt-2 last:mr-0"
        },
        footer: {
            root: "my-3 pt-7",
            list: {
                root: "flex flex-wrap gap-4"
            }
        }
    },
    listItemButton: "w-full rounded-md p-3 my-4 first:mt-0 last:mb-0 border-slate-200 shadow-inner drop-shadow-2xl"
} as const;

type ProjectLocation = {
    icon: string,
    link: LinkType
};

type Project = {
    id: number;
    name: string,
    summary: string,
    technologies: Array<string>,
    locations: Array<ProjectLocation>
};

const PROJECTS: Array<Project> = [
    {
        id: 1,
        name: "Hello-World",
        summary: "Personal Portfolio",
        technologies: ["Eslint", "Next.js", "Tailwind", "Gsap", REACT, TYPESCRIPT],
        locations: [
            {
                icon: ICON_NAMES.GITHUB,
                link: {
                    rel: "GitHub",
                    href: "https://github.com/otubassey/portfolio"
                }
            },
            {
                icon: ICON_NAMES.OPEN_IN_NEW,
                link: {
                    rel: "Hello-World",
                    href: "http://localhost:3000/"
                }
            }
        ]
    }
] as const;

function Projects() {
    return (
        <List component="ol" aria-label="Projects">
            {
                PROJECTS.map(project => {
                    const {id, name, summary, technologies, locations} = project;
                    return (
                        <ListItemButton key={id} className={CLASSNAMES.listItemButton}>
                            <Card className={CLASSNAMES.card.root}>
                                <CardTextHeader
                                    className={CLASSNAMES.card.header}
                                    primary={name}
                                    secondary={summary}
                                    textProps={{
                                        component: Title,
                                        variant: "h5"
                                    }}
                                />
                                <CardTextContent className={CLASSNAMES.card.content.root} aria-label="Project Summary">
                                    <List className="flex flex-wrap gap-3" aria-label="Technologies">
                                        {
                                            technologies.map(technology => (
                                                <ListItemText key={technology} aria-label={technology}>
                                                    <Chip className={CLASSNAMES.card.content.chip} label={technology} />
                                                </ListItemText>
                                            ))
                                        }
                                    </List>                     
                                </CardTextContent>
                                <CardFooter className={CLASSNAMES.card.footer.root}>
                                    <List className={CLASSNAMES.card.footer.list.root} aria-label="Technologies">
                                        {
                                            locations.map(location => (
                                                <ListItemButton key={location.icon}>
                                                    <IconButton
                                                        icon={location.icon}
                                                        component={Link}
                                                        iconProps={{title: {value: location.link.rel}}}
                                                        value={location.link}
                                                    />
                                                </ListItemButton>
                                            ))
                                        }
                                    </List>
                                </CardFooter>
                            </Card>
                        </ListItemButton>
                    );
                })
            }
        </List>
    );
}

export default memo(Projects);