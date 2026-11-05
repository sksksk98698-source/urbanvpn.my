import fs from "node:fs";

const pages = [
	"dist/brands/index.html",
	"dist/reviews/index.html",
	"dist/warnings/index.html",
	"dist/clients/index.html",
	"dist/topics/index.html",
];

for (const p of pages) {
	if (fs.existsSync(p)) {
		const html = fs.readFileSync(p, "utf8");
		const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
		const descMatch = html.match(
			/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
		);
		const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
		const canonicalMatch = html.match(
			/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i,
		);

		console.log(`\n=== Page: ${p} ===`);
		console.log(`Title: ${titleMatch ? titleMatch[1].trim() : "NONE"}`);
		console.log(
			`Desc: ${descMatch ? descMatch[1].slice(0, 60) + "..." : "NONE"}`,
		);
		console.log(
			`H1: ${h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : "NONE"}`,
		);
		console.log(`Canonical: ${canonicalMatch ? canonicalMatch[1] : "NONE"}`);
	} else {
		console.log(`Missing page: ${p}`);
	}
}
