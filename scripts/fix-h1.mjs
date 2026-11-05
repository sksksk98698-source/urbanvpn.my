import fs from "node:fs";

const file = "src/pages/[...lang]/posts/[...slug].astro";
let content = fs.readFileSync(file, "utf8");

// 把第 102 行的 <div 替换为 <h1
content = content.replace(
	/<div(\r?\n\s*data-pagefind-body\s+data-pagefind-weight="10"\s+data-pagefind-meta="title")/,
	"<h1$1",
);

fs.writeFileSync(file, content, "utf8");
console.log("Fixed opening tag <h1 in posts/[...slug].astro");
