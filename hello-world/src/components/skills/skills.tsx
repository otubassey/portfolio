import { memo } from "react";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";

import {HelloWorldSnippets} from "../home/helloWorldSnippets";
import { Skill } from "./skill.types";
import { SKILLS } from "./skills.constants";
import {TechnologyList} from "./technologies";

const CLASSNAMES = {
    root: "grid grid-cols-1 gap-4"
} as const;

type SkillProps = {
    className?: string
};

function Skills({className}: SkillProps) {
    return (
        <div className={ClassesUtil.concat(CLASSNAMES.root, className)}>
            <TechnologyList skills={SKILLS} />
        </div>
    );
}

export default memo(withDisplayName<SkillProps>()(Skills));
