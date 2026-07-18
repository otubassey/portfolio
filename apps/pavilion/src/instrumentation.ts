export async function register() {
  	if(process.env.NEXT_RUNTIME === "nodejs") {
		const { Bootstrap } = await import("@otuekong-portfolio/exhibit/pavilion-server");

		Bootstrap.run();
		console.log("✅ ExhibitContext Container for Pavilion Bootstrapped Successfully!");
	}
}
