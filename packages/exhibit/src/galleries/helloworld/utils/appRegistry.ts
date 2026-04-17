import { AppDetail, AppDetailsByFamily, AppPageDetail } from "../constants";

class AppRegistry {
	private readonly apps: ReadonlyArray<AppDetail>;
	private readonly appsByFamily: AppDetailsByFamily;

	constructor(initialApps: ReadonlyArray<AppDetail> | null | undefined) {
		this.apps = Object.freeze(initialApps ?? []);
		this.appsByFamily = this.transformToFamilyMap(this.apps);
	}

	public getAppsByFamily() { return this.appsByFamily; }

	public getAppDetails(): ReadonlyArray<AppDetail> {
		return this.apps;
	}

	public getAppDetailByName(appName?: string): AppDetail | undefined {
		if(!appName) {
			return appName as undefined;
		}
		return this.apps.find((appDetail: AppDetail) => appDetail.name === appName);
	}

	public getFirstAppSummary(): AppDetail | null {
        const firstApp = this.apps[0];
        if(!firstApp) return null;
        return { ...firstApp, component: null, pageDetails: [] };
    }

	public getPageDetailsForApp(appName?: string): ReadonlyArray<AppPageDetail> {
		if(!appName) {
			return [];
		}
		const appDetail = this.getAppDetailByName(appName);
		return appDetail?.pageDetails || [];
	}

	public getPageDetailForApp(appName: string, pageName: string): AppPageDetail | null {
		const pageDetails = this.getPageDetailsForApp(appName);
		return pageDetails.find(pageDetail => pageDetail.name === pageName) || null;
	}

	private transformToFamilyMap(apps: ReadonlyArray<AppDetail>): AppDetailsByFamily {
		return apps.reduce((accumulator, app) => {
			const { family, name, version } = app;
			if(!accumulator[family]) accumulator[family] = [];
			accumulator[family] = [...accumulator[family], { family, name, version }];
			return accumulator;
		}, {} as AppDetailsByFamily);
	}
}

export default AppRegistry;
