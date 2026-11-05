import fs from "node:fs";

const file = "src/pages/[...lang]/posts/[...slug].astro";
let content = fs.readFileSync(file, "utf8");

const target = "const jsonLd = {";

const addition = `const postUrl = siteUrl(getPostUrlBySlug(entry.id, lang));

const breadcrumbJsonLd = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{
			"@type": "ListItem",
			position: 1,
			name: "首页",
			item: siteUrl(),
		},
		{
			"@type": "ListItem",
			position: 2,
			name: entry.data.category || "机场评测",
			item: siteUrl("/brands/"),
		},
		{
			"@type": "ListItem",
			position: 3,
			name: entry.data.title,
			item: postUrl,
		},
	],
};

const jsonLd = {`;

content = content.replace(target, addition);
content = content.replace(
	"set:html={JSON.stringify(jsonLd)}",
	"set:html={JSON.stringify([jsonLd, breadcrumbJsonLd])}",
);

fs.writeFileSync(file, content, "utf8");
console.log("Added BreadcrumbList Schema to post slug");
