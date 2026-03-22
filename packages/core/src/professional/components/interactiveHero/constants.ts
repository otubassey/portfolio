import { Technology } from "../../data";

export const CORE_TECHNOLOGIES = [
	Technology.JAVASCRIPT,
	Technology.TYPESCRIPT,
	Technology.REACT,
	Technology.NODE_JS,
	Technology.JAVA,
	Technology.SPRING_BOOT,
	Technology.PYTHON,
	Technology.DART,
	Technology.FLUTTER,
	Technology.VUE,
	Technology.ANGULAR,
	Technology.ELECTRON_JS
] as const;

export const HELLO_WORLD_LANGUAGES = [
	{ lang: Technology.JAVASCRIPT, code: "console.log(\"Hello, World!\");" },
	{ lang: Technology.JAVA, code: "System.out.println(\"Hello, World!\");" },
	{ lang: Technology.TYPESCRIPT, code: "console.log(\"Hello, World!\");" },
	{ lang: Technology.DART, code: "print(\"Hello, World!\");" },
	{ lang: Technology.PYTHON, code: "print(\"Hello, World!\")" }
] as const;

