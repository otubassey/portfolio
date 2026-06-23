import { ExhibitContext } from "../common";
import PavilionContainer from "./pavilionContainer";

ExhibitContext.registerFactory(() => (
	PavilionContainer.bootstrap()
));

export { ExhibitContext } from "../common";

export { default as PavilionApp } from "./pavilionApp";
export { default as PavilionContainer } from "./pavilionContainer";
