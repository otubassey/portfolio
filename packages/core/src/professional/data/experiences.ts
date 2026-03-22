import { Technology, TechnologyName } from "./technologies";

export interface Experience {
	id: string;
	company: string;
	description: string;
	endDate: string;
	isCurrent: boolean;
	projectTitle: string;
	responsibilities: Array<string>;
	startDate: string;
	technologies: Array<TechnologyName>;
	title: string;
}

const {
	ANGULAR_JS,
	BOOTSTRAP,
	CSS,
    ELECTRON_JS,
	EJB,
    EXPRESS_JS,
	FIGMA,
	GIT,
	GIT_LAB,
	HIBERNATE,
	HTML,
	JAVA,
	J2EE,
	JAVA_EE,
    JAVASCRIPT,
	JAVA_SWING,
	JDBC,
	JEST,
	JPA,
	JSF,
	JSON,
	JQUERY,
	JUNIT,
	MONGO_DB,
	MYSQL,
    NODE_JS,
	OPENAPI_SWAGGER,
	ORACLE,
	ORACLE_WEBLOGIC_SERVER,
	POSTMAN,
	PRIME_FACES,
    REACT,
	REST,
	SOAP,
    SPRING_BOOT,
	SPRING_FRAMEWORK,
	SVN,
	TOMCAT,
	WEBSPHERE_APPLICATION_SERVER,
	XHTML,
	XML,
	YAML
} = Technology;

export const EXPERIENCES: Array<Experience> = [
	{
		id: "experience-spectrum-2017",
		title: "Software Engineer V",
		company: "Charter Communications",
		isCurrent: true,
		projectTitle: "AgentOS (Formerly Gateway)",
		startDate: "2017",
		endDate: "2026",
		description: `Managed the strategic integration and enhancement of key business domains including Entitlements, Troubleshooting, Shipments, and Self-Install within Charter’s micro-frontend ecosystem. Orchestrated the transition of standalone legacy tools into the unified AgentOS platform, significantly reducing tool-switching for agents. Led the architectural merger of the Shipments and Self-Install projects into a consolidated React/Spring Boot BFF service and currently spearheading the migration of Troubleshooting services from legacy TIBCO to a modern, Agentic AI-ready microservice architecture.`,
		technologies: [CSS, ELECTRON_JS, EXPRESS_JS, FIGMA, GIT, GIT_LAB, HTML, JAVA, JAVASCRIPT, JDBC, JEST, JSON, JUNIT, MONGO_DB, MYSQL, NODE_JS, OPENAPI_SWAGGER, POSTMAN, REACT, SPRING_BOOT, TOMCAT, YAML],
		responsibilities: [
			"Lead the technical evolution of the Entitlements and Troubleshooting domains, driving the effort to migrate these from standalone applications into integrated React micro-frontends within AgentOS.",
			"Directed the successful merger of the Shipments and Self-Install projects, streamlining the frontend into a shared React component project powered by a unified Spring Boot BFF (Backend-for-Frontend) API.",
			"Spearheading the high-priority migration of Troubleshooting logic from TIBCO to Spring Boot microservices, re-architecting APIs to support both web-based agent workflows and emerging Agentic AI initiatives.",
			"Architected complex backend integrations for the Entitlements engine, coordinating multiple upstream APIs to deliver unified, high-performance data responses to the UI.",
			"Conduct thorough code reviews and mentor developers within the team, ensuring adherence to Javascript, React, Java best practices, and enterprise standards.",
			"Leading the expansion of the Troubleshooting domain (2024 to Present), implementing advanced diagnostic steps and automated solutions to enhance the agent's ability to resolve hardware, software, and signal issues.",
			"Developed and refined complex, accessible React components using Material UI (v4/v5), ensuring a consistent and responsive experience across diverse agent-facing modules.",
			"Partner with architects, designers, and business stakeholders to transform high-level requirements into refined digital experiences, managing the full SDLC within a fast-paced Agile environment."
		]
	},
	{
		id: "experience-aamc-2016",
		title: "Software Developer III",
		company: "Association of American Medical Colleges (AAMC)",
		isCurrent: false,
		projectTitle: "General Service Oriented Architecture (SOA)",
		startDate: "2017",
		endDate: "2017",
		description: `Driven by the need for increased scalability and reduced operational overhead, this initiative involved the strategic decomposition of a monolithic J2EE API into a suite of high-availability Spring MVC microservices. Orchestrated the migration of a 20-service portfolio from WebSphere to Apache Tomcat, while spearheading the organizational transition from legacy SVN to Git version control. This structural overhaul significantly increased system uptime and streamlined the deployment lifecycle for the association’s shared web services.`,
		technologies: [GIT, JAVA, JAVA_EE, JPA, JSON, JUNIT, POSTMAN, REST, SPRING_FRAMEWORK, SVN, TOMCAT, WEBSPHERE_APPLICATION_SERVER],
		responsibilities: [
			"Collaborated in a specialized backend team to re-architect a legacy J2EE monolith into modular Spring MVC microservices, resulting in improved fault isolation and reduced infrastructure costs.",
			"Designed and developed a number of services from the ground up, implementing a comprehensive suite of REST endpoints to expose mission-critical employee data to cross-functional consuming teams.",
			"Managed the technical migration of the core SOA portfolio—including Identity (UAM), Privilege, and Utility services—from IBM WebSphere to Apache Tomcat 7.0.",
			"Led the end-to-end migration of the entire service portfolio from SVN to Git, establishing modern branching strategies and improving developer workflow efficiency.",
			"Implemented a robust business layer utilizing Spring IOC and AOP, leveraging Hibernate for ORM persistence and Spring DAO for optimized data access.",
			"Engineered secure RESTful endpoints for User Account Management (UAM) and Authorization (Privilege) services to support internal security protocols.",
			"Authored comprehensive unit and system test scripts, ensuring high service reliability through rigorous integration testing within an Agile framework.",
			"Provided high-tier troubleshooting and defect resolution, maintaining the integrity of shared services utilized across the entire organization."
		]
	},
	{
		id: "experience-spectrum-2016",
		title: "Full-Stack Developer",
		company: "Charter Communications",
		isCurrent: false,
		projectTitle: "CIOT (Customer Impacting Outage Tool)",
		startDate: "2016",
		endDate: "2016",
		description: `Spearheaded a high-impact architectural modernization of Charter’s in-house geospatial outage detection platform, specifically optimized for tech-mobile field agents. Migrated a legacy JSF/EJB application to a modern, high-performance, and responsive stack using Bootstrap, jQuery, and the Google Maps API. This revamp empowered field technicians to visualize real-time network health and customer-outage clusters at granular geolocation levels, enabling faster on-site diagnostics and streamlined incident resolution across the network.`,
		technologies: [BOOTSTRAP, CSS, EJB, HTML, JAVA, JAVASCRIPT, JSF, JQUERY, NODE_JS, ORACLE_WEBLOGIC_SERVER, PRIME_FACES, XHTML],
		responsibilities: [
			"Engineered a responsive, interactive map using the Google Maps JavaScript API, tailored for tech-mobile agents to identify and navigate to outage hotspots in the field.",
			"Led the transition from legacy JSF/PrimeFaces to a modern Bootstrap and JavaScript frontend, significantly improving load times and touch-interface usability for mobile devices.",
			"Authored a library of reusable Java utility classes to standardize spatial data transformations and business rules across the EPM ecosystem.",
			"Managed the application lifecycle using NPM and Webpack, leveraging modern bundling techniques to optimize frontend performance for varying field network conditions.",
			"Managed the full deployment lifecycle via Git, ensuring stable production releases and providing rapid troubleshooting for mission-critical field services.",
			"Engineered RESTful Web Services and backend logic using EJB to facilitate seamless data flow.",
			"Designed and developed core application modules, including user authentication, preference filtering, and complex reporting screens using XHTML, jQuery, and JavaScript."
		]
	},
	{
		id: "experience-paychex-2015",
		title: "Software Developer III",
		company: "PayChex Inc.",
		isCurrent: false,
		projectTitle: "Paychex Next Generation",
		startDate: "2015",
		endDate: "2016",
		description: `Contributed to the 'Paychex Next Generation' initiative, a large-scale Java enterprise system for Tax and HR product management. Collaborated with senior engineers to modernize legacy modules, implementing data-rich web interfaces using AngularJS and D3.js for complex reporting. Developed backend persistence layers with Hibernate and integrated SOAP APIs to support thousands of business clients.`,
		technologies: [ANGULAR_JS, HIBERNATE, J2EE, JAVA, JAVA_SWING, JAVASCRIPT, JDBC, JQUERY, ORACLE, SOAP, WEBSPHERE_APPLICATION_SERVER, XML],
		responsibilities: [
			"Contributed to the transition of a massive Enterprise Product Management (EPM) system from Java Swing/SOAP to a modern web architecture.",
			"Engineered responsive web forms and interactive interfaces using AngularJS, HTML5, and JavaScript to manage Tax and HR product data.",
			"Leveraged D3.js to design and implement complex data visualizations, providing businesses with actionable insights through interactive reports and charts.",
			"Translated functional specifications into technical blueprints, developing UML Class and Sequence Diagrams to ensure scalable module architecture.",
			"Optimized data retrieval and storage processes by implementing Hibernate 3.0 ORM layers interfacing with Oracle 10g databases.",
			"Integrated SOAP-based web services to facilitate seamless communication between the frontend and backend systems, supporting thousands of business requests.",
			"Provided rapid troubleshooting and debugging for mission-critical enterprise services, maintaining high availability for thousands of business clients."
		]
	}
] as const;
