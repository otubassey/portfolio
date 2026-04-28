import { Technology, TechnologyName } from "./technologies";

export const PROFICIENCY: Partial<Record<TechnologyName, number>> = {
	[Technology.ANGULAR]: 60,
	[Technology.BITBUCKET]: 95,
	[Technology.CSS]: 80,
	[Technology.CYPRESS]: 60,
	[Technology.DART]: 60,
	[Technology.ELECTRON_JS]: 70,
	[Technology.EXPRESS_JS]: 85,
	[Technology.FIGMA]: 75,
	[Technology.FLUTTER]: 60,
	[Technology.GIT]: 90,
	[Technology.GIT_LAB]: 50,
	[Technology.HIBERNATE]: 75,
	[Technology.HTML]: 90,
	[Technology.JAVA]: 85,
	[Technology.JAVASCRIPT]: 95,
	[Technology.JDBC]: 75,
	[Technology.JEST]: 65,
	[Technology.JPA]: 75,
	[Technology.JSF]: 55,
	[Technology.JSON]: 100,
	[Technology.JSP]: 55,
	[Technology.JUNIT]: 80,
	[Technology.MONGO_DB]: 70,
	[Technology.MYSQL]: 65,
	[Technology.NEXT_JS]: 65,
	[Technology.NODE_JS]: 85,
	[Technology.OPENAPI_SWAGGER]: 85,
	[Technology.POSTGRESQL]: 65,
	[Technology.POSTMAN]: 90,
	[Technology.PRIME_FACES]: 50,
	[Technology.PYTHON]: 35,
	[Technology.REACT]: 95,
	[Technology.REACT_NATIVE]: 65,
	[Technology.REST]: 85,
	[Technology.SASS]: 65,
	[Technology.SOAP]: 60,
	[Technology.SPRING_BOOT]: 80,
	[Technology.SPRING_FRAMEWORK]: 75,
	[Technology.TAILWIND_CSS]: 65,
	[Technology.TYPESCRIPT]: 85,
	[Technology.XML]: 75,
	[Technology.YAML]: 100,
	[Technology.VUE]: 65
} as const;

export const SkillCategory = {
	FRONTEND: "Frontend",
	BACKEND: "Backend",
	MOBILE: "Mobile",
	DESKTOP: "Desktop",
	TESTING: "Testing & QA",
	TOOLS: "Tools & DevOps"
} as const;

interface SkillItem {
	name: TechnologyName;
	level: number;
}

export interface SkillGroup {
	category: typeof SkillCategory[keyof typeof SkillCategory];
	emoji: string;
	emojiLabel: string;
	technologies: Array<SkillItem>;
}

const createGroup = (
	category: SkillGroup["category"],
	emoji: string,
	emojiLabel: string,
	technologyNames: Array<TechnologyName>
): SkillGroup => ({
	category,
	emoji,
	emojiLabel,
	technologies: technologyNames.map(name => ({
		name,
		level: PROFICIENCY[name] ?? 0
	}))
});

export const SKILL_GROUPS: Array<SkillGroup> = [
	createGroup(SkillCategory.FRONTEND, "🎨", "Frontend Development", [
		Technology.REACT,
		Technology.NEXT_JS,
		Technology.VUE,
		Technology.ANGULAR,
		Technology.TYPESCRIPT,
		Technology.JAVASCRIPT,
		Technology.TAILWIND_CSS,
		Technology.SASS,
		Technology.HTML,
		Technology.CSS,
		Technology.JSF,
		Technology.JSP,
		Technology.PRIME_FACES
	]),
	createGroup(SkillCategory.BACKEND, "⚙️", "Backend and Databases", [
		Technology.NODE_JS,
		Technology.SPRING_BOOT,
		Technology.SPRING_FRAMEWORK,
		Technology.EXPRESS_JS,
		Technology.JAVA,
		Technology.PYTHON,
		Technology.MONGO_DB,
		Technology.MYSQL,
		Technology.HIBERNATE,
		Technology.JPA,
		Technology.JDBC,
		Technology.REST,
		Technology.SOAP,
		Technology.JSON,
		Technology.XML,
		Technology.YAML
	]),
	createGroup(SkillCategory.MOBILE, "📱", "Mobile App Development", [
		Technology.REACT_NATIVE,
		Technology.FLUTTER,
		Technology.DART,
		Technology.ELECTRON_JS
	]),
	createGroup(SkillCategory.DESKTOP, "🖥️", "Desktop Applications", [
		Technology.ELECTRON_JS
	]),
	createGroup(SkillCategory.TESTING, "🧪", "Testing and Quality Assurance", [
		Technology.CYPRESS,
		Technology.JEST,
		Technology.JUNIT,
		Technology.POSTMAN
	]),
	createGroup(SkillCategory.TOOLS, "🛠️", "Development Tools and DevOps", [
		Technology.GIT,
		Technology.FIGMA,
		Technology.OPENAPI_SWAGGER
	])
];
