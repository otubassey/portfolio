"use client";

import { withProfile } from "../../common";
import { CodeEditorConsoleFrame } from "../../professional";

import { PERSONA_INFO } from "../data";

const ProfileCodeEditorInteractiveHero = withProfile(PERSONA_INFO)(CodeEditorConsoleFrame, data => ({
	firstName: data.name.first,
	passion: data.passion,
	title: data.role
}));

ProfileCodeEditorInteractiveHero.displayName = "ProfileCodeEditorInteractiveHero";

export default ProfileCodeEditorInteractiveHero;
