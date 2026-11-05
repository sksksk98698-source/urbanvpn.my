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
console.log("Total files:", allHtml.length);

let missingTitle = 0;
let missingDesc = 0;
let missingOgImage = 0;
let titleTooLong = 0;
const sampleIssues = [];

for (const file of allHtml) {
	const html = fs.readFileSync(file, "utf8");

	const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
	const title = titleMatch ? titleMatch[1].trim() : "";
	if (!title) {
		missingTitle++;
		sampleIssues.push({ file, issue: "Missing Title" });
	} else if (title.length > 70) {
		titleTooLong++;
	}

	const descMatch =
		html.match(
			/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
		) ||
		html.match(
			/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i,
		);
	const desc = descMatch ? descMatch[1].trim() : "";
	if (!desc) {
		missingDesc++;
		if (sampleIssues.length < 10)
			sampleIssues.push({ file, issue: "Missing Description" });
	}

	const ogImgMatch = html.match(
		/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i,
	);
	if (!ogImgMatch) {
		missingOgImage++;
	}
}

console.log("Missing Title:", missingTitle);
console.log("Title Too Long (>70 chars):", titleTooLong);
console.log("Missing Description:", missingDesc);
console.log("Missing og:image:", missingOgImage);
if (sampleIssues.length > 0) {
	console.log("Sample meta issues:", sampleIssues.slice(0, 5));
}
