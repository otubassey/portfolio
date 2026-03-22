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
	email: "otuekong.bassey@gmail.com",
	phone: "+1 786-448-4446",
	location: "Missouri, United States",
	github: ProfessionalNetworkLink.GITHUB,
	linkedin: ProfessionalNetworkLink.LINKED_IN
} as const;

export type ContactDetailsAttributes = typeof CONTACT_DETAILS;

export default CONTACT_DETAILS;
