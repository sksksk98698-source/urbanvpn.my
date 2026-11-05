import fs from "node:fs";
import path from "node:path";

const postsDir = "src/content/posts";
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

const bannerMap = {};

for (const f of files) {
	const content = fs.readFileSync(path.join(postsDir, f), "utf8");
	const imgMatch = content.match(/^image:\s*["']?(.*?)["']?$/m);
	const img = imgMatch ? imgMatch[1].trim() : "NO_IMAGE";
	if (!bannerMap[img]) bannerMap[img] = [];
	bannerMap[img].push(f);
}

console.log("Frontmatter image distribution:");
for (const [img, list] of Object.entries(bannerMap)) {
	console.log(`Cover: [${img}] -> used in ${list.length} posts`);
}
