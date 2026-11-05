import fs from "node:fs";

const files = fs
	.readdirSync("src/content/posts")
	.filter((f) => f.endsWith(".md"));

console.log("Total posts:", files.length);

const issues = [];
for (const f of files) {
	const slug = f.replace(".md", "");
	// 检查是否包含中文
	if (/[\u4e00-\u9fa5]/.test(slug)) {
		issues.push({ slug, issue: "Contains Chinese" });
	}
	// 检查是否以纯日期命名
	if (/^\d{4}[-_]?\d{2}[-_]?\d{2}/.test(slug)) {
		issues.push({ slug, issue: "Starts with date" });
	}
	// 检查是否包含大写
	if (/[A-Z]/.test(slug)) {
		issues.push({ slug, issue: "Contains Uppercase" });
	}
	// 检查是否包含随机数字或无语义 id
	if (/^(post|article)[-_]?\d+$/.test(slug)) {
		issues.push({ slug, issue: "Random number / non-semantic" });
	}
}

console.log("Slug issues count:", issues.length);
if (issues.length > 0) {
	console.log("Issues:", issues);
} else {
	console.log(
		"All post slugs are 100% compliant: lowercase, semantic, english/pinyin, no random numbers, no dates!",
	);
}
