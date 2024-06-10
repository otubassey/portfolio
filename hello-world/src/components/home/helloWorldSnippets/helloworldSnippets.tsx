"use client";

import { memo } from "react";
import PropTypes from "prop-types";

import { Skill } from "@/components/skills/";
import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";
import {Carousel} from "@/ui/widgets/carousel/";

import Controller from "./controller";
import { CODE_SNIPPETS } from "./helloWorldSnippets.constants";
import SnippetPanel from "./snippetPanel";

type Props = {
    className?: string;
    values: ReadonlyArray<Skill>;
};

HelloWorldSnippets.propTypes = {
    className: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape({
        hasSnippet: PropTypes.bool,
        name: PropTypes.string,
        type: PropTypes.string
    }))
};

function HelloWorldSnippets({className, values}: Props) {
    const languagesWithNoSnippets = values.filter(tech => CODE_SNIPPETS.every(snippet => (snippet.language !== tech.name)));
    return (
        <div className={ClassesUtil.concat("grid grid-cols-1 gap-1 md:gap-4", className)}>
            <Carousel
                controller={<Controller />}
                orientation="vertical">
                {
                    CODE_SNIPPETS.map(codeSnippet => (
                        <SnippetPanel
                            key={codeSnippet.language}
                            language={codeSnippet.language}
                            tabs={codeSnippet.tabs}
                        />
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

export default memo(withDisplayName()(HelloWorldSnippets));
