"use client";

import { FormEvent, Ref, useCallback } from "react";

import { Section, SectionHandle } from "@otuekong-portfolio/curio";

import { CONTACT_DETAILS } from "../data";

import ContactFormCard from "./contactFormCard";
import ContactInformationCard from "./contactInformationCard";

const DEFAULT_FORM_DATA = {
	name: "",
	email: "",
	message: "",
} as const;

export interface ContactSectionProps {
	className?: string;
	id?: string;
	ref?: Ref<SectionHandle>;
}

function ContactSection({
	className = "",
	id,
	ref
}: ContactSectionProps) {
	const handleSendEmail = useCallback((_: FormEvent, formData: typeof DEFAULT_FORM_DATA) => {
	}, []);
	return (
		<Section
			ref={ref}
			className={className}
			heading="Get In Touch"
			headingProps={{
				className: "sm:text-left lg:text-center"
			}}
			id={id}
			subtitle="Have a project in mind or want to collaborate? I'd love to hear from you!"
			subtitleProps={{
				className: "sm:text-left lg:text-center"
			}}>

			<div className="flex flex-col gap-8">
				<ContactInformationCard
					contactDetails={CONTACT_DETAILS}
					id={`${id}-contact-information`}
				/>

				<ContactFormCard
					onSubmit={handleSendEmail}
					id={`${id}-contact-form`}
				/>
			</div>

		</Section>
	);
};

ContactSection.displayName = "ContactSection";

export default ContactSection;
