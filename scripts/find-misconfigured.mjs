import fs from "node:fs";
import path from "node:path";

const postsDir = "src/content/posts";
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

const misconfigured = [];

for (const f of files) {
	if (f === "guangsu-cloud-review.md") continue;
	const content = fs.readFileSync(path.join(postsDir, f), "utf8");
	if (
		content.includes('image: "/media/speedtest/光速云-节点测速实测.png"') ||
		content.includes("image: '/media/speedtest/光速云-节点测速实测.png'")
	) {
		misconfigured.push(f);
	}
}

console.log("Misconfigured count:", misconfigured.length);
console.log("Files:", misconfigured);
