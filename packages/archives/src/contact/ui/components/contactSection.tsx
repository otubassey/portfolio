"use client";

import { Ref } from "react";

import { Section, SectionHandle } from "@otuekong-portfolio/curio";

import { CONTACT_DETAILS } from "../../core/data";

import ContactFormCard from "./contactFormCard";
import ContactInformationCard from "./contactInformationCard";

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
	return (
		<Section
			ref={ref}
			className={className}
			heading="Get In Touch"
			headingProps={{
				className: "sm:text-left lg:text-center"
			}}
			id={id}
			subheading="Have a project in mind or want to collaborate? I'd love to hear from you!"
			subheadingProps={{
				className: "sm:text-left lg:text-center"
			}}>

			<div className="flex flex-col gap-8">
				<ContactInformationCard
					location={CONTACT_DETAILS.location}
					id={`${id}-contact-information`}
				/>

				<ContactFormCard
					id={`${id}-contact-form`}
				/>
			</div>

		</Section>
	);
};

ContactSection.displayName = "ContactSection";

export default ContactSection;
