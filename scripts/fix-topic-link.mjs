import fs from "node:fs";

const file = "src/pages/topics/index.astro";
let content = fs.readFileSync(file, "utf8");

content = content.replace("/brands/feimao/", "/brands/flycat/");

fs.writeFileSync(file, content, "utf8");
console.log("Fixed feimao brand link in topics/index.astro");
