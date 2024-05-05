export const SKILL_TYPE = Object.freeze({
    DATA_SERIALIZATION_FORMAT: "Data Serialization Format",
    FRAMEWORK: "Framework",
    LIBRARY: "Library",
    PROGRAMMING_LANGUAGE: "Programming Language",
    TECHNOLOGY: "Technology",
    TOOL_OR_PLATFORM: "Tool or Platform",
    WEB__SERVICE: "Web Service"
});

export const Technologies = {
    ANGULAR: "Angular",
    CSS: "CSS",
    CYPRESS: "Cypress",
    ELECTRON_JS: "Electron.js",
    EXPRESS_JS: "Express.js",
    FIGMA: "Figma",
    GIT: "Git",
    HIBERNATE: "Hibernate",
    HTML: "HTML",
    JAVA: "Java",
    JAVASCRIPT: "Javascript",
    JDBC: "JDBC",
    JEST: "Jest",
    JPA: "JPA",
    JSF: "JSF",
    JSON: "JSON",
    JSP: "JSP",
    JUNIT: "Junit",
    MONGO_DB: "MongoDB",
    NODE_JS: "Node.js",
    POSTMAN: "Postman",
    PRIME_FACES: "Primefaces",
    REACT: "React",
    REST: "REST",
    SASS: "SASS",
    SOAP: "SOAP",
    SPRING_BOOT: "Spring Boot",
    SPRING_FRAMEWORK: "Spring Framework",
    SWAGGER: "Swagger",
    SQL: "SQL",
    TYPESCRIPT: "Typescript",
    XML: "XML",
    YAML: "YAML",
} as const;

export const SKILLS = [
    {
        type: SKILL_TYPE.PROGRAMMING_LANGUAGE,
        name: Technologies.JAVASCRIPT,
        hasSnippet: true
    },
    {
        type: SKILL_TYPE.PROGRAMMING_LANGUAGE,
        name: Technologies.TYPESCRIPT,
        hasSnippet: true
    },
    {
        type: SKILL_TYPE.PROGRAMMING_LANGUAGE,
        name: Technologies.HTML,
        hasSnippet: true
    },
    {
        type: SKILL_TYPE.PROGRAMMING_LANGUAGE,
        name: "XHTML",
        hasSnippet: true
    },
    {
        type: SKILL_TYPE.PROGRAMMING_LANGUAGE,
        name: Technologies.CSS,
        hasSnippet: true
    },
    {
        type: SKILL_TYPE.PROGRAMMING_LANGUAGE,
        name: Technologies.SASS,
        hasSnippet: true
    },
    {
        type: SKILL_TYPE.PROGRAMMING_LANGUAGE,
        name: Technologies.JAVA,
        hasSnippet: true
    },
    {
        type: SKILL_TYPE.TECHNOLOGY,
        name: Technologies.JSP,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.PROGRAMMING_LANGUAGE,
        name: "Scala",
        hasSnippet: true
    },
    {
        type: SKILL_TYPE.PROGRAMMING_LANGUAGE,
        name: Technologies.SQL,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.PROGRAMMING_LANGUAGE,
        name: "HQL",
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.WEB__SERVICE,
        name: Technologies.SOAP,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.WEB__SERVICE,
        name: Technologies.REST,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.WEB__SERVICE,
        name: "WSDL",
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.WEB__SERVICE,
        name: "JAX-RS",
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.WEB__SERVICE,
        name: "JAX-WS",
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.FRAMEWORK,
        name: Technologies.JSF,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.FRAMEWORK,
        name: Technologies.ANGULAR,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.FRAMEWORK,
        name: Technologies.EXPRESS_JS,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.LIBRARY,
        name: Technologies.REACT,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.FRAMEWORK,
        name: Technologies.ELECTRON_JS,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.FRAMEWORK,
        name: Technologies.JEST,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.FRAMEWORK,
        name: Technologies.CYPRESS,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.TOOL_OR_PLATFORM,
        name: Technologies.GIT,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.TOOL_OR_PLATFORM,
        name: Technologies.FIGMA,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.TOOL_OR_PLATFORM,
        name: Technologies.SWAGGER,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.TOOL_OR_PLATFORM,
        name: Technologies.MONGO_DB,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.TOOL_OR_PLATFORM,
        name: Technologies.POSTMAN,
        hasSnippet: false
    },
    {
        type: SKILL_TYPE.DATA_SERIALIZATION_FORMAT,
        name: Technologies.JSON,
        hasSnippet: true 
    },
    {
        type: SKILL_TYPE.DATA_SERIALIZATION_FORMAT,
        name: Technologies.YAML,
        hasSnippet: true 
    },
    {
        type: SKILL_TYPE.DATA_SERIALIZATION_FORMAT,
        name: Technologies.XML,
        hasSnippet: true 
    }
] as const;
