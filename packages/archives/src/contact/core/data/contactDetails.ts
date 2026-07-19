export const ProfessionalNetwork = Object.freeze({
	GITHUB: "github",
	LINKED_IN: "linkedin"
} as const);

export type ProfessionalNetworkType = typeof ProfessionalNetwork[keyof typeof ProfessionalNetwork];

export const ProfessionalNetworkLink = Object.freeze({
	GITHUB: "https://github.com/otubassey",
	LINKED_IN: "https://www.linkedin.com/in/otuekong-bassey-a3941996"
} as const);

const CONTACT_DETAILS = Object.freeze({
	github: ProfessionalNetworkLink.GITHUB,
	linkedin: ProfessionalNetworkLink.LINKED_IN,
	location: "Missouri, United States"
} as const);

export default CONTACT_DETAILS;
