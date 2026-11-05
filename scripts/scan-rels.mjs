import fs from "node:fs";
import path from "node:path";

function findInDir(dir) {
	const files = fs.readdirSync(dir);
	for (const f of files) {
		const full = path.join(dir, f);
		if (fs.statSync(full).isDirectory()) {
			findInDir(full);
		} else if (full.endsWith(".astro") || full.endsWith(".svelte")) {
			const content = fs.readFileSync(full, "utf8");
			const matches = content.matchAll(/<a[^>]+rel=["']([^"']*)["'][^>]*>/gi);
			for (const m of matches) {
				console.log(`${full}: ${m[0]}`);
			}
		}
	}
}

findInDir("src");
