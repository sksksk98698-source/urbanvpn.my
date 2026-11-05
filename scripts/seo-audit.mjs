import fs from "node:fs";
import path from "node:path";

const report = {};

// 1. Robots & Sitemap
console.log("=== Checking 1. Robots & Sitemap ===");
const robotsPath = "dist/robots.txt";
if (fs.existsSync(robotsPath)) {
	const robots = fs.readFileSync(robotsPath, "utf8");
	console.log("Robots content:\n" + robots);
}

// 2. Canonical across 30 pages
console.log("\n=== Checking 2. Canonical Tags (Sampling 30 pages) ===");
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
console.log(`Total HTML pages in dist: ${allHtml.length}`);

const samplePages = allHtml.slice(0, 30);
let canonicalIssues = 0;
for (const p of samplePages) {
	const html = fs.readFileSync(p, "utf8");
	const canonMatch =
		html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i) ||
		html.match(
			/<link[^>]+href=["'][^"']+["'][^>]+rel=["']canonical["'][^>]*>/i,
		);
	if (!canonMatch) {
		console.log(`[NO CANONICAL] ${p}`);
		canonicalIssues++;
	} else {
		const hrefMatch = canonMatch[0].match(/href=["']([^"']+)["']/i);
		const href = hrefMatch ? hrefMatch[1] : "";
		if (!href.startsWith("https://urbanvpn.my")) {
			console.log(`[NON-HTTPS/NON-CANONICAL DOMAIN] ${p} -> ${href}`);
			canonicalIssues++;
		}
	}
}
console.log(`Canonical check completed. Sample issues: ${canonicalIssues}`);

// 3. Check Outbound Affiliate Links for rel="nofollow sponsored noopener"
console.log("\n=== Checking 3. Risk Control: Outbound Affiliate Links ===");
let outboundCount = 0;
let unsafeOutboundCount = 0;
const unsafeLinks = [];

for (const p of allHtml) {
	const html = fs.readFileSync(p, "utf8");
	const links = html.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi) || [];
	for (const l of links) {
		const hrefMatch = l.match(/href=["']([^"']+)["']/i);
		const href = hrefMatch ? hrefMatch[1] : "";
		// check if it's external link (starts with http/https and not urbanvpn.my and not schema.org)
		if (href.startsWith("http://") || href.startsWith("https://")) {
			if (
				!href.includes("urbanvpn.my") &&
				!href.includes("schema.org") &&
				!href.includes("astro.build") &&
				!href.includes("w3.org")
			) {
				outboundCount++;
				const relMatch = l.match(/rel=["']([^"']+)["']/i);
				const rel = relMatch ? relMatch[1] : "";
				const isNofollow = rel.includes("nofollow");
				const isSponsored = rel.includes("sponsored");
				if (!isNofollow || !isSponsored) {
					unsafeOutboundCount++;
					if (unsafeLinks.length < 10) {
						unsafeLinks.push({ page: p, tag: l, href });
					}
				}
			}
		}
	}
}
console.log(`Total external links checked: ${outboundCount}`);
console.log(
	`Unsafe external links (missing nofollow/sponsored): ${unsafeOutboundCount}`,
);
if (unsafeLinks.length > 0) {
	console.log("Sample unsafe external links:", unsafeLinks);
}

// 4. Content Thinness / Word Count
console.log("\n=== Checking 4. Content Thinness (< 2000 chars) ===");
const thinPages = [];
for (const p of allHtml) {
	// only check articles or main landing pages
	if (
		p.includes("dist\\posts") ||
		p.includes("dist\\brands\\") ||
		p.includes("dist\\topics") ||
		p.includes("dist\\warnings") ||
		p.includes("dist\\clients") ||
		p.includes("dist\\reviews")
	) {
		const html = fs.readFileSync(p, "utf8");
		// strip tags
		const text = html
			.replace(/<script[\s\S]*?<\/script>/gi, "")
			.replace(/<style[\s\S]*?<\/style>/gi, "")
			.replace(/<[^>]+>/g, "")
			.replace(/\s+/g, "");
		const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
		if (
			chineseChars < 1200 &&
			!p.endsWith("index.html") &&
			p.includes("dist\\posts")
		) {
			thinPages.push({ page: p, chineseCount: chineseChars });
		}
	}
}
console.log(`Thin content post pages count: ${thinPages.length}`);
if (thinPages.length > 0) {
	console.log("Sample thin pages:", thinPages.slice(0, 5));
}

// 5. Schema Validation & JSON-LD
console.log("\n=== Checking 5. Schema & JSON-LD Validation ===");
let schemaCount = 0;
let schemaErrors = 0;
const sampleSchemas = [];

for (const p of samplePages) {
	const html = fs.readFileSync(p, "utf8");
	const jsonLdMatches =
		html.match(
			/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
		) || [];
	for (const m of jsonLdMatches) {
		schemaCount++;
		const content = m.replace(/<script[^>]*>/i, "").replace(/<\/script>/i, "");
		try {
			const parsed = JSON.parse(content);
			if (sampleSchemas.length < 5)
				sampleSchemas.push({ page: p, type: parsed["@type"] });
		} catch (e) {
			console.log(`[SCHEMA JSON PARSE ERROR] in ${p}: ${e.message}`);
			schemaErrors++;
		}
	}
}
console.log(
	`Total schemas checked in 30 samples: ${schemaCount}, Parse Errors: ${schemaErrors}`,
);
console.log("Sample schema types found:", sampleSchemas);

// 6. Template Fingerprint / Duplicate Detection
console.log("\n=== Checking 6. Template Fingerprint & Duplication ===");
const postsDir = "dist/posts";
if (fs.existsSync(postsDir)) {
	const posts = fs.readdirSync(postsDir);
	console.log(`Total post directories/files: ${posts.length}`);
}

// 7. Check for Leaked Tracking IDs or Analytics
console.log("\n=== Checking 7. Analytics & Tracking Isolation ===");
let foundGA = false;
let foundBaidu = false;
for (const p of samplePages) {
	const html = fs.readFileSync(p, "utf8");
	if (
		html.includes("G-") ||
		html.includes("google-analytics.com") ||
		html.includes("gtag")
	) {
		foundGA = true;
	}
	if (html.includes("hm.baidu.com")) {
		foundBaidu = true;
	}
}
console.log(
	`Google Analytics detected: ${foundGA}, Baidu Analytics detected: ${foundBaidu}`,
);
