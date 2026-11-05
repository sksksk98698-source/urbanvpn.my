import fs from "node:fs";
import path from "node:path";

const postsDir = "src/content/posts";
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

for (const f of files) {
	const content = fs.readFileSync(path.join(postsDir, f), "utf8");
	const imgMatch = content.match(/^image:\s*["']?(.*?)["']?$/m);
	if (imgMatch && imgMatch[1].includes("光速云")) {
		console.log(f, "->", imgMatch[1]);
	}
}
