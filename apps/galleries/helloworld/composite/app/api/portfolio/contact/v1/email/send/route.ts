import { NextRequest } from "next/server";

import { ExhibitContext, GalleriesContainer } from "@otuekong-portfolio/exhibit/galleries";

export async function POST(request: NextRequest) {
	const galleryContainer = ExhibitContext.get<GalleriesContainer>();
	return galleryContainer.contactServiceHandler.sendEmailInquiry(request);
}
