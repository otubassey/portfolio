import { NextRequest } from "next/server";

import { ConfiguredContactServiceHandler } from "@otuekong-portfolio/exhibit";

export async function POST(request: NextRequest) {
	return ConfiguredContactServiceHandler.sendEmailInquiry(request);
}
