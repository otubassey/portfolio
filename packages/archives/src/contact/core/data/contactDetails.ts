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
	github: ProfessionalNetworkLink.GITHUB,
	jobEmail: "contact@otuekongbassey.com",
	linkedin: ProfessionalNetworkLink.LINKED_IN,
	location: "Missouri, United States",
	phone: "+1 786-448-4446"
} as const;

export type ContactDetailsAttributes = typeof CONTACT_DETAILS;

export const getInContactDetails = (property: keyof ContactDetailsAttributes) => CONTACT_DETAILS[property];

export default CONTACT_DETAILS;
