import { memo } from "react";
import PropTypes from "prop-types";

import { displayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

import { SKILLS } from "./skills.constants";
import {TechnologyList} from "./technologies";

const CLASSNAMES = {
    root: "grid grid-cols-1 gap-4"
} as const;

type Props = {
    className?: string
};

Skills.propTypes = {
    className: PropTypes.string
};

function Skills({className}: Props) {
    return (
        <div className={ClassesUtils.concat(CLASSNAMES.root, className)}>
            <TechnologyList skills={SKILLS} />
        </div>
    );
}

export default memo(displayName<Props>()(Skills));
