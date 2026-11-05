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
const brokenLinks = [];
let totalInternalLinksChecked = 0;

for (const file of allHtml) {
	const html = fs.readFileSync(file, "utf8");
	const matches = html.matchAll(/href=["']([^"'#?]+)["']/g);
	for (const m of matches) {
		let href = m[1];
		if (href.startsWith("https://urbanvpn.my/")) {
			href = href.replace("https://urbanvpn.my", "");
		}

		if (href.startsWith("/")) {
			totalInternalLinksChecked++;
			let sub = href.slice(1);
			if (sub.endsWith("/")) sub += "index.html";
			else if (sub === "") sub = "index.html";
			else if (!path.extname(sub)) sub += "/index.html";

			const target = path.join("dist", sub);
			if (!fs.existsSync(target)) {
				brokenLinks.push({ from: file, link: m[1], target });
			}
		}
	}
}

console.log("Total Internal Links Checked:", totalInternalLinksChecked);
console.log("Broken Internal Links Found:", brokenLinks.length);
if (brokenLinks.length > 0) {
	// deduplicate by link
	const uniqueBroken = [...new Set(brokenLinks.map((b) => b.link))];
	console.log("Unique broken targets:", uniqueBroken);
	console.log("First 5 broken details:", brokenLinks.slice(0, 5));
}
