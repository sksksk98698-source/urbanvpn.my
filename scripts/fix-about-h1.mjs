import fs from "node:fs";

const file = "src/pages/[...lang]/about.astro";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
	/\r?\n\s*<h1 class="sr-only">关于 urbanVPN 网络实验室<\/h1>/,
	"",
);

fs.writeFileSync(file, content, "utf8");
console.log("Removed duplicate H1 in about.astro");
