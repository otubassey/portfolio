"use client";

import { ChangeEvent, FormEvent, useCallback, useState } from "react";

import {
	Button,
	CssUtils,
	EmailTextField,
	Section,
	TextArea,
	TextField
} from "@otuekong-portfolio/curio";

const DEFAULT_FORM_DATA = {
	name: "",
	email: "",
	message: "",
} as const;

interface ContactFormCardProps {
	onSubmit: (e: FormEvent, formData: typeof DEFAULT_FORM_DATA) => void;
	className?: string;
	id?: string;
}

function ContactFormCard({
	onSubmit,
	className,
	id
}: ContactFormCardProps) {
	const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.value
		}));
	}, []);
	const handleSubmit = useCallback((event: FormEvent) => {
		event.preventDefault();
		onSubmit(event, formData);
	}, [formData, onSubmit]);
	return (
		<Section
			id={id}
			className={CssUtils.mergeClasses(
				"flex flex-col gap-6 bg-white dark:bg-gray-800 p-8 w-full",
				"border border-gray-200 dark:border-gray-700 shadow-md",
				className
			)}
			heading="Send a Message"
			raised
			rounded>

			<div className="leading-relaxed text-slate-600 dark:text-slate-400 space-y-6 p-0">
				<form
					className="space-y-6"
					onSubmit={handleSubmit}>

					<TextField
						autoComplete="name"
						fullWidth
						id="name"
						label="Your Name"
						name="name"
						onChange={handleChange}
						placeholder="John Doe"
						required
						value={formData.name}
					/>

					<EmailTextField
						fullWidth
						id="email"
						label="Your Email"
						name="email"
						onChange={handleChange}
						placeholder="john@example.com"
						required
						value={formData.email}
					/>

					<TextArea
						fullWidth
						id="message"
						label="Message"
						minRows={6}
						name="message"
						onChange={handleChange}
						placeholder="Tell me about your project..."
						required
						value={formData.message}
					/>

					{submitStatus === "success" && (
					<div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300">
						Thank you! Your message has been sent successfully.
					</div>
					)}

					{submitStatus === "error" && (
					<div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
						Oops! Something went wrong. Please try again.
					</div>
					)}

					<Button
						fullWidth
						size="large"
						startIcon="send"
						type="submit">
						Send Message
					</Button>

				</form>
			</div>

		</Section>
	);
}

ContactFormCard.displayName = "ContactFormCard";

export default ContactFormCard;
