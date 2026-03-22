"use client";

import { FormEvent, Ref, useCallback } from "react";

import { Section, SectionHandle } from "@otuekong-portfolio/design-system";

import { ContactDetailsAttributes } from "../data";

import ContactFormCard from "./contactFormCard";
import ContactInformationCard from "./contactInformationCard";

const DEFAULT_FORM_DATA = {
	name: "",
	email: "",
	message: "",
} as const;

export interface ContactSectionProps {
	contactInfo: ContactDetailsAttributes;
	className?: string;
	id?: string;
	// onSubmit?: (data: { name: string; email: string; message: string }) => void | Promise<void>;
	ref?: Ref<SectionHandle>;
}

function ContactSection({
	contactInfo,
	className = "",
	id,
	// onSubmit,
	ref
}: ContactSectionProps) {
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus("idle");

//     try {
//       if (onSubmit) {
//         await onSubmit(formData);
//         setSubmitStatus("success");
//         setFormData(DEFAULT_FORM_DATA);
//       }
//     } catch (error) {
//       setSubmitStatus("error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
	const handleSendEmail = useCallback((_: FormEvent, formData: typeof DEFAULT_FORM_DATA) => {
		// handleSubmit(e);
		// TODO: Integrate with email service or backend
		console.log("Email sent:", formData);
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

			{/* <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-6xl mx-auto w-full"> */}
			<div className="flex flex-col gap-8">
				<ContactInformationCard
					contactDetails={contactInfo}
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
