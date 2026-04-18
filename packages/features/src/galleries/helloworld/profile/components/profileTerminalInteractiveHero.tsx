"use client";

import { withProfile } from "../../common";
import { TerminalConsoleFrame } from "../../professional";

import { PERSONA_INFO } from "../data";

const ProfileTerminalInteractiveHero = withProfile(PERSONA_INFO)(TerminalConsoleFrame, data => ({
	firstName: data.name.first,
	lastName: data.name.last
}));

ProfileTerminalInteractiveHero.displayName = "ProfileTerminalInteractiveHero";

export default ProfileTerminalInteractiveHero;
