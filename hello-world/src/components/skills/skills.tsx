import { memo } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";

import { SKILLS } from "./skills.constants";
import {TechnologyList} from "./technologies";

const CLASSNAMES = {
    root: "grid grid-cols-1 gap-4"
} as const;

type Props = {
    className?: string
};

Skills.prototypes = {
    className: PropTypes.string
};

function Skills({className}: Props) {
    return (
        <div className={ClassesUtil.concat(CLASSNAMES.root, className)}>
            <TechnologyList skills={SKILLS} />
        </div>
    );
}

export default memo(withDisplayName<Props>()(Skills));
