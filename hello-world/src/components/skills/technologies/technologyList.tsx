import { memo } from "react";

import List from "@/ui/widgets/list/list";
import ListItemText from "@/ui/widgets/list/listItemText";

import { withDisplayName } from "@/ui/decorator";
import { Title } from "@/ui/widgets/title";

import { SKILL_TYPE } from "../skills.constants";
import { Skill } from "../skill.types";

const CLASSNAMES = {
    list: {
        root: "grid grid-cols-2 auto-cols-min gap-4 p-2 text-wrap md:grid-cols-1 lg:grid-cols-2",
        item: {primary: "text-xs"}
    },
    listAndTitleContainer: "grid grid-cols-2 gap-4",
    root: "grid",
    title: "p-2 text-wrap"
} as const;

const TITLES_BY_SKILL_TYPE = {
    [SKILL_TYPE.DATA_SERIALIZATION_FORMAT]: "Data Serialization Formats",
    [SKILL_TYPE.FRAMEWORK]: "Frameworks",
    [SKILL_TYPE.LIBRARY]: "Libraries",
    [SKILL_TYPE.PROGRAMMING_LANGUAGE]: "Programming Languages",
    [SKILL_TYPE.TECHNOLOGY]: "Technologies",
    [SKILL_TYPE.TOOL_OR_PLATFORM]: "Tools or Platforms",
    [SKILL_TYPE.WEB__SERVICE]: "Web Services"
} as const;

type TechnologiesByTitle = {
    readonly [key in typeof TITLES_BY_SKILL_TYPE[keyof typeof TITLES_BY_SKILL_TYPE]]: Array<string>;
};

const mapTechnologiesByTitle = (skills: ReadonlyArray<Skill> | null): TechnologiesByTitle | Partial<TechnologiesByTitle> => (
    skills
    ? skills.reduce((techListBytitle, skill) => {
        const key = TITLES_BY_SKILL_TYPE[skill.type];
        if(!techListBytitle[key]) {
            return {...techListBytitle, [key]: [skill.name]};
        }
        return {...techListBytitle, [key]: [...techListBytitle[key], skill.name]};
    }, {} as TechnologiesByTitle)
    : {} as TechnologiesByTitle
);

type TechnologyListProps = {
    skills: ReadonlyArray<Skill> | null
};

function TechnologyList({skills = null}: TechnologyListProps) {
    const technologiesByTitle = mapTechnologiesByTitle(skills);
    return (
        <div className={CLASSNAMES.root}>
            {
                Object.entries(technologiesByTitle!).map(([title, values]) => (
                    <div key={title} className={CLASSNAMES.listAndTitleContainer} aria-label="groupings of technologies">
                        <Title aria-label={title} className={CLASSNAMES.title} variant="h5">{title}</Title>
                        {
                            <List aria-label={`List of ${title}`} className={CLASSNAMES.list.root}>
                                {
                                    values.map(value => (
                                        <ListItemText   
                                            key={value}
                                            aria-label={value}
                                            className={CLASSNAMES.list.item}
                                            primary={value}
                                        />
                                    ))
                                }
                            </List>
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default memo(withDisplayName<TechnologyListProps>()(TechnologyList));
