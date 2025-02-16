// TODO: jsdoc for each
const PlaygroundNodeCategory = {
    DATA_COMPONENT: "DATA_COMPONENT",
    HTML_COMPONENT: "HTML_COMPONENT",
    HWIUI_COMPONENT: "HWIUI_COMPONENT",
    PLAYGROUND_COMPONENT: "PLAYGROUND_COMPONENT",
    PLAYGROUND_COMPONENT_PROPS: "PLAYGROUND_COMPONENT_PROPS"
} as const;

const PlaygroundNodeType = {
    CHOICE: "choice",
    ELEMENT: "element",
    FRAGMENT: "fragment",
    ICON: "icon",
    INPUT: "input",
    TEXT: "text"
} as const;

export {
    PlaygroundNodeCategory,
    PlaygroundNodeType
};
