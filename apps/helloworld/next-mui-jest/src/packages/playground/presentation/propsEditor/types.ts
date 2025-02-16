import { PlaygroundAttributesRecord, PresentationProps } from "../../shared";

export type OnNodeChange = (val: PlaygroundAttributesRecord) => void;

export type PropInputProps = PresentationProps & {
    onNodeChange: OnNodeChange;
};
