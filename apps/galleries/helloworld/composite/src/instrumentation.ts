export async function register() {
  	if(process.env.NEXT_RUNTIME === "nodejs") {
		const { Bootstrap } = await import("@otuekong-portfolio/exhibit/helloworld-composite-server");

		Bootstrap.run();
		console.log("✅ ExhibitContext Container for Helloworld-Composite Bootstrapped Successfully!");
	}
}
