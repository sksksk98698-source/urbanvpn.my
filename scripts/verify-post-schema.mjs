import fs from "node:fs";

const html = fs.readFileSync(
	"dist/posts/guangsu-cloud-review/index.html",
	"utf8",
);
const schemas =
	html.match(
		/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
	) || [];

console.log("Schemas count in post:", schemas.length);
schemas.forEach((s, idx) => {
	const content = s.replace(/<script[^>]*>/i, "").replace(/<\/script>/i, "");
	try {
		const parsed = JSON.parse(content);
		console.log(
			`Schema #${idx + 1}:`,
			Array.isArray(parsed) ? parsed.map((p) => p["@type"]) : parsed["@type"],
		);
	} catch (e) {
		console.log(`Schema #${idx + 1} parse error:`, e.message);
	}
});

const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
console.log("H1:", h1 ? h1[0].replace(/<[^>]+>/g, "").trim() : "NONE");
