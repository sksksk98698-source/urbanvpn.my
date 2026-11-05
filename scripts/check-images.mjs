import fs from "node:fs";
import path from "node:path";

const postsDir = "src/content/posts";
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

const imageUsage = {};

for (const f of files) {
	const content = fs.readFileSync(path.join(postsDir, f), "utf8");
	const imgs = content.match(/!\[.*?\]\((.*?)\)/g) || [];
	for (const img of imgs) {
		const srcMatch = img.match(/\((.*?)\)/);
		const src = srcMatch ? srcMatch[1] : "";
		if (!imageUsage[src]) imageUsage[src] = [];
		imageUsage[src].push(f);
	}
}

console.log("Image usage summary across markdown posts:");
for (const [src, posts] of Object.entries(imageUsage)) {
	console.log(`Image: [${src}] -> used in ${posts.length} posts`);
	if (posts.length > 2) {
		console.log("   Sample posts:", posts.slice(0, 5));
	}
}
