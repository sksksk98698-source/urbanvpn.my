import fs from "node:fs";

const file = "src/components/misc/ImageWrapper.astro";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
	'alt={alt || ""}',
	'alt={alt || "urbanVPN 网络实验室评测配图"}',
);
content = content.replace(
	'alt={alt || ""}',
	'alt={alt || "urbanVPN 网络实验室评测配图"}',
);

fs.writeFileSync(file, content, "utf8");
console.log("Updated ImageWrapper default alt");
