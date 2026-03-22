import { OnAppDetailSelectHandler, OnPageSectionSelectHandler, OnPageSelectHandler } from "../../features";
import { AppDetail, AppDetailsByFamily, AppPageDetail, MainPageSectionType, MainPageType } from "../../constants";
import { AppRegistry } from "../../utils";

export interface AppDetailsState {
	appDetailsByFamily: AppDetailsByFamily;
	isMobileMenuOpen: boolean;
	onAppDetailSelect: OnAppDetailSelectHandler;
	onPageSectionSelect: OnPageSectionSelectHandler;
	onPageSelect: OnPageSelectHandler;
	pageDetails: ReadonlyArray<AppPageDetail>;
	registry: AppRegistry;
	selectedAppDetail: AppDetail | null;
	selectedPage: MainPageType | null;
	selectedPageSection: MainPageSectionType | null;
	toggleIsMobileMenuOpen: (value?: unknown) => void;
}
