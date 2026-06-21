import { ExhibitContext } from "../common";
import GalleriesContainer from "./galleryContainer";

ExhibitContext.registerFactory(() => (
	GalleriesContainer.bootstrap()
));

export { default as GalleriesContainer } from "./galleryContainer";
export * from "./server";
export * from "./ui";

export { ExhibitContext } from "../common";
