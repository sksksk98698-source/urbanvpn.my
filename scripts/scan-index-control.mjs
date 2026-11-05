import fs from "node:fs";
import path from "node:path";

function getAllHtmlFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir);
	for (const f of files) {
		const full = path.join(dir, f);
		if (fs.statSync(full).isDirectory()) {
			getAllHtmlFiles(full, fileList);
		} else if (full.endsWith(".html")) {
			fileList.push(full);
		}
	}
	return fileList;
}

const allHtml = getAllHtmlFiles("dist");
console.log("Total HTML files to inspect:", allHtml.length);

const noindexPages = [];
const nofollowRobotsPages = [];

for (const f of allHtml) {
	const html = fs.readFileSync(f, "utf8");
	// 检查 meta robots
	const robotsMatch = html.match(
		/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i,
	);
	if (robotsMatch) {
		const val = robotsMatch[1].toLowerCase();
		if (val.includes("noindex")) {
			noindexPages.push({ file: f, content: val });
		}
		if (val.includes("nofollow") && !f.includes("404")) {
			nofollowRobotsPages.push({ file: f, content: val });
		}
	}
}

console.log("Pages with meta robots noindex:", noindexPages.length);
if (noindexPages.length > 0) {
	console.log("Sample noindex pages:", noindexPages);
}
console.log("Pages with meta robots nofollow:", nofollowRobotsPages.length);
if (nofollowRobotsPages.length > 0) {
	console.log("Sample nofollow pages:", nofollowRobotsPages);
}
