import { displayName } from "@/hwiui/decorator";
import { Section } from "@/hwiui/widgets/section";

import { HelloWorldSnippets } from "./helloWorldSnippets";
import { SKILLS } from "../skills/skills.constants";
import { Skill } from "../skills/skill.types";

const LANGUAGES_WITH_SNIPPETS: ReadonlyArray<Skill> = SKILLS.filter(skill => skill.hasSnippet, []);

function Home() {
    return (
        <Section title="My Coding Toolbox" titleProps={{variant: "h5"}}>
            <HelloWorldSnippets values={LANGUAGES_WITH_SNIPPETS} />
        </Section>
    );
}

export default displayName()(Home);
