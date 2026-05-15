export const ProfessionalNetwork = {
	GITHUB: "github",
	LINKED_IN: "linkedin"
} as const;

export type ProfessionalNetworkType = typeof ProfessionalNetwork[keyof typeof ProfessionalNetwork];

export const ProfessionalNetworkLink = {
	GITHUB: "https://github.com/otubassey",
	LINKED_IN: "https://www.linkedin.com/in/otuekong-bassey-a3941996"
} as const;

const CONTACT_DETAILS = {
	github: ProfessionalNetworkLink.GITHUB,
	linkedin: ProfessionalNetworkLink.LINKED_IN,
	location: "Missouri, United States"
} as const;

export default CONTACT_DETAILS;
