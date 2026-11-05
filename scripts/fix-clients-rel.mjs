import fs from "node:fs";

const file = "src/pages/clients/index.astro";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
	'rel="nofollow noopener noreferrer"',
	'rel="noopener noreferrer"',
);

fs.writeFileSync(file, content, "utf8");
console.log('Updated clients page external links to rel="noopener noreferrer"');
