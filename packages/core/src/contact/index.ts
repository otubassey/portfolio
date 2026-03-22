"use client";

import { withProfile } from "../common";

import { ContactSection, GitHubLinkButton, LinkedInLinkButton } from "./components";
import { CONTACT_DETAILS } from "./data";

const ProfileContactSection = withProfile(CONTACT_DETAILS)(ContactSection, data => ({
	contactInfo: data
}));

export {
	GitHubLinkButton,
	LinkedInLinkButton,
	ProfileContactSection
};
