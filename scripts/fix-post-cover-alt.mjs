import fs from "node:fs";

const file = "src/pages/[...lang]/posts/[...slug].astro";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
	'<ImageWrapper id="post-cover" src={entry.data.image}',
	'<ImageWrapper id="post-cover" src={entry.data.image} alt={entry.data.title + " 晚高峰延迟与网络实测"}',
);

fs.writeFileSync(file, content, "utf8");
console.log("Added explicit alt to post-cover in [...slug].astro");
