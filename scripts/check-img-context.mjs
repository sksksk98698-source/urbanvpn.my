import fs from "node:fs";

const html = fs.readFileSync(
	"dist/en/posts/baiyueguang-review/index.html",
	"utf8",
);
const idx = html.indexOf("光速云-节点测速实测.png");
console.log(
	"Context of 光速云-节点测速实测.png in baiyueguang:",
	html.slice(Math.max(0, idx - 150), idx + 250),
);
