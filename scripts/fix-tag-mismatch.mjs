import fs from "node:fs";

const file = "src/pages/[...lang]/posts/[...slug].astro";
let content = fs.readFileSync(file, "utf8");

// 把第 78 行的 <h1 class="flex w-full 还原为 <div class="flex w-full
content = content.replace(
	'<h1 class="flex w-full rounded-(--radius-large) overflow-hidden relative mb-4">',
	'<div class="flex w-full rounded-(--radius-large) overflow-hidden relative mb-4">',
);

fs.writeFileSync(file, content, "utf8");
console.log("Restored outer div tag on line 78 of [...slug].astro");
