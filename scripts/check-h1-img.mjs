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

const allHtml = getAllHtmlFiles("dist").filter((f) => !f.includes("partytown"));

let missingH1 = 0;
let multipleH1 = 0;
let totalImages = 0;
let missingAlt = 0;
const sampleH1Issues = [];
const sampleAltIssues = [];

for (const file of allHtml) {
	const html = fs.readFileSync(file, "utf8");

	// H1 check
	const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
	if (h1Matches.length === 0) {
		missingH1++;
		sampleH1Issues.push({ file, issue: "No H1" });
	} else if (h1Matches.length > 1) {
		multipleH1++;
		if (sampleH1Issues.length < 5)
			sampleH1Issues.push({ file, issue: `Multiple H1 (${h1Matches.length})` });
	}

	// Image alt check
	const imgMatches = html.match(/<img[^>]+>/gi) || [];
	for (const img of imgMatches) {
		totalImages++;
		const hasAlt = /alt=["'][^"']*["']/i.test(img);
		if (!hasAlt) {
			missingAlt++;
			if (sampleAltIssues.length < 5) sampleAltIssues.push({ file, img });
		}
	}
}

console.log("Total business HTML files checked:", allHtml.length);
console.log("Missing H1:", missingH1);
console.log("Multiple H1:", multipleH1);
console.log("Sample H1 issues:", sampleH1Issues);
console.log("Total Images:", totalImages);
console.log("Missing Alt Images:", missingAlt);
if (sampleAltIssues.length > 0) {
	console.log("Sample Missing Alt:", sampleAltIssues);
}
