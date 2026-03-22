"use client";

import { withProfile } from "../common";
import { CodeEditorConsoleFrame, TerminalConsoleFrame } from "../professional";

import { BioSection, Copyright, Identity, Salutation } from "./components";
import { PERSONA_INFO } from "./data";

const ProfileBioSection = withProfile(PERSONA_INFO)(BioSection, data => ({
	bioText: data.bio,
	headingText: data.role
}));

const ProfileCodeEditorInteractiveHero = withProfile(PERSONA_INFO)(CodeEditorConsoleFrame, data => ({
	firstName: data.name.first,
	passion: data.passion,
	title: data.role
}));

const ProfileCopyright = withProfile(PERSONA_INFO)(Copyright, data => ({
	name: data.name.full
}));

const ProfileIdentity = withProfile(PERSONA_INFO)(Identity, data => ({
	name: data.name.full,
	role: data.role
}));

const ProfileSalutation = withProfile(PERSONA_INFO)(Salutation, data => ({
	name: data.name
}));

const ProfileTerminalInteractiveHero = withProfile(PERSONA_INFO)(TerminalConsoleFrame, data => ({
	firstName: data.name.first,
	lastName: data.name.last
}));

export {
	ProfileBioSection,
	ProfileCodeEditorInteractiveHero,
	ProfileCopyright,
	ProfileIdentity,
	ProfileSalutation,
	ProfileTerminalInteractiveHero
};
