const BIO = `I'm a highly motivated and results-oriented Senior Full-Stack Developer with over 10 years of experience designing,
developing, and deploying robust web applications. I possess a strong command of both front-end and back-end technologies, enabling me
to deliver exceptional user experiences while ensuring efficient and scalable solutions.`;

const PERSONA_INFO = {
	name: {
		first: "Otuekong",
		firstPhonetic: "Oh-tueh-kong",
		last: "Bassey",
		lastPhonetic: "Bah-see",
		full: "Otuekong Bassey",
		fullPhonetic: "Oh-tueh-kong Bah-see",
		firstPronunciationAudio: "/audio/name-pronunciation.mp3"
	},
	bio: BIO,
	passion: "Building scalable systems with modern technologies",
	role: "Senior Full-Stack Engineer"
} as const;

export type PersonaInfoAttributes = typeof PERSONA_INFO;

export default PERSONA_INFO;
