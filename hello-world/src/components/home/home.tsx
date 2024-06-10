import { withDisplayName } from "@/ui/decorator";

import { HelloWorldSnippets } from "./helloWorldSnippets";
import { SKILLS } from "../skills/skills.constants";
import { Skill } from "../skills/skill.types";

const LANGUAGES_WITH_SNIPPETS: ReadonlyArray<Skill> = SKILLS.filter(skill => skill.hasSnippet, []);

function Home() {
    return (<HelloWorldSnippets values={LANGUAGES_WITH_SNIPPETS} />);
}

export default withDisplayName()(Home);
