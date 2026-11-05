import fs from "node:fs";
import path from "node:path";

const postsDir = "src/content/posts";
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

console.log("Total post markdown files:", files.length);

const structureMap = {};
const samples = [];

for (const f of files) {
	const content = fs.readFileSync(path.join(postsDir, f), "utf8");
	// 提取所有 h2
	const h2s = (content.match(/^##\s+(.*)$/gm) || []).map((h) =>
		h.replace(/^##\s+/, "").trim(),
	);
	const h3s = (content.match(/^###\s+(.*)$/gm) || []).map((h) =>
		h.replace(/^###\s+/, "").trim(),
	);

	// 核心骨架（去掉具体品牌名后的模式）
	const skeleton = h2s
		.map((h) =>
			h
				.replace(/^[一二三四五六七八九十\d.\s、]+/, "")
				.replace(
					/光速云|萤火虫|星岛梦|飞鸟云|大佬云|微风|闪电鼠|闪电云|速捷|山水云|良心云|老猫云|大猫云|白月光|飞猫云|环球梯|青云梯|客信|悠兔|肥猫|红叶|二猫|领猫|极客|快连|一帆|神行|银杏人|灵动|有米|云界线|宇宙|无忧|极联|浪网|榴莲云|龙猫云|山岳|爱云/g,
					"[品牌]",
				),
		)
		.join(" | ");

	if (!structureMap[skeleton]) structureMap[skeleton] = 0;
	structureMap[skeleton]++;

	samples.push({
		file: f,
		wordCount: content.length,
		h2Count: h2s.length,
		skeleton,
	});
}

console.log("Unique skeleton patterns:", Object.keys(structureMap).length);
console.log("Structure patterns distribution:");
for (const [sk, count] of Object.entries(structureMap)) {
	console.log(`- Count: ${count} -> ${sk.slice(0, 100)}...`);
}
