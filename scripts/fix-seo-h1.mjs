import fs from "node:fs";

// 1. archive.astro
const archiveFile = "src/pages/[...lang]/archive.astro";
if (fs.existsSync(archiveFile)) {
	let content = fs.readFileSync(archiveFile, "utf8");
	if (!content.includes("<h1")) {
		content = content.replace(
			/(<MainGridLayout[^>]*>)/,
			'$1\n    <h1 class="sr-only">{i18n(I18nKey.archive, lang)}</h1>',
		);
		fs.writeFileSync(archiveFile, content, "utf8");
		console.log("Added H1 to archive.astro");
	}
}

// 2. [...page].astro (Home & Pagination)
const pageFile = "src/pages/[...lang]/[...page].astro";
if (fs.existsSync(pageFile)) {
	let content = fs.readFileSync(pageFile, "utf8");
	if (!content.includes("<h1")) {
		content = content.replace(
			/(<MainGridLayout[^>]*>)/,
			'$1\n    <h1 class="sr-only">urbanVPN · 42 家主流机场深度测评与网络可观测性评测中心</h1>',
		);
		fs.writeFileSync(pageFile, content, "utf8");
		console.log("Added H1 to [...page].astro");
	}
}

// 3. about.astro
const aboutFile = "src/pages/[...lang]/about.astro";
if (fs.existsSync(aboutFile)) {
	let content = fs.readFileSync(aboutFile, "utf8");
	if (!content.includes("<h1")) {
		content = content.replace(
			/(<MainGridLayout[^>]*>)/,
			'$1\n    <h1 class="sr-only">关于 urbanVPN 网络实验室</h1>',
		);
		fs.writeFileSync(aboutFile, content, "utf8");
		console.log("Added H1 to about.astro");
	}
}
