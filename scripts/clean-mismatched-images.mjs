import fs from "node:fs";
import path from "node:path";

const postsDir = "src/content/posts";
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

let modifiedCount = 0;

for (const f of files) {
	if (f === "guangsu-cloud-review.md") continue;
	const fullPath = path.join(postsDir, f);
	let content = fs.readFileSync(fullPath, "utf8");
	if (content.includes("/media/speedtest/光速云-节点测速实测.png")) {
		// 移除 frontmatter 中的 image 行
		content = content.replace(
			/^image:\s*["']?\/media\/speedtest\/光速云-节点测速实测\.png["']?\r?\n/m,
			"",
		);
		fs.writeFileSync(fullPath, content, "utf8");
		modifiedCount++;
		console.log(`Cleaned mismatched image from: ${f}`);
	}
}

console.log(`Total cleaned posts: ${modifiedCount}`);
