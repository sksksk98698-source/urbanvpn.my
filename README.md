# urbanVPN · 机场可观测性评测中心与网络技术知识库

<p align="center">
  <img src="public/assets/images/banner.svg" alt="urbanVPN Banner" width="100%" style="border-radius: 12px; max-height: 280px; object-fit: cover;" />
</p>

<p align="center">
  <strong>基于 Astro 5+、Tailwind CSS 与 Svelte 构建的现代化、专著级技术评测平台</strong>
</p>

<p align="center">
  <a href="https://urbanvpn.my"><img src="https://img.shields.io/badge/Production-urbanvpn.my-0ea5e9?style=flat-square&logo=cloudflare" alt="Site" /></a>
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Built%20with-Astro-ff5d01?style=flat-square&logo=astro" alt="Astro" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Style-Tailwind%20CSS-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" /></a>
  <a href="https://svelte.dev"><img src="https://img.shields.io/badge/Components-Svelte%205-ff3e00?style=flat-square&logo=svelte" alt="Svelte" /></a>
  <img src="https://img.shields.io/badge/SEO%20Health-98.2%2F100-emerald?style=flat-square&logo=google" alt="SEO Health Score" />
  <img src="https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-blue?style=flat-square" alt="License" />
</p>

---

## 📖 项目简介 (Overview)

**urbanVPN** (`https://urbanvpn.my`) 是一套面向高端出海从业者、开发者与跨境科研人员的**专业网络可观测性评测中心与机场导航数据库**。

项目彻底摈弃市面主流博客的低质软文与模板化套皮，围绕 **真实实测证据、网络工程硬核科普、晚高峰延迟数据监控与防跑路资金风控**，打造从底层代码到上层内容的 100% 原创、纯净且合规的现代化技术资产。

---

## ✨ 核心特色 (Core Highlights)

### 1. ⚡ 极限性能与 SSG 预渲染

- **Astro 5+ 全静态生成 (SSG)**：全站 260+ 页面均为编译期预构建 HTML，毫秒级首屏极速加载。
- **Pagefind 离线搜索引擎**：零后端服务，全静态高精度多语言中文/英文离线分词检索。
- **Swup 无缝页面平滑过渡**：单页应用级的丝滑路由跳转与阅读体验。

### 2. 🛡️ 顶尖 SEO & GEO (生成式AI收录) 架构 (实测 98.2 分)

- **四大搜索引擎友好**：内置面向 Googlebot、bingbot、Baiduspider、yisouspider (神马/UC/夸克) 的独立优化规则与动态生成 `robots.txt`。
- **双重 Sitemap 兼容**：自动生成 `sitemap-index.xml` 与兼容主流提交的 `sitemap.xml`，收录有效 URL 260+。
- **专著级结构化数据**：按页面类型精准注入 Schema.org (包含 `WebSite`, `Organization`, `BlogPosting`, `BreadcrumbList`, `FAQPage`)。
- **纯净化隔离**：零第三方追踪指纹（无滥用 GA4/百度统计连坐风险），外链严格区分商业赞助 (`rel="sponsored"`) 与开源权威引用。

### 3. 📊 矩阵化落地内容与可观测性资产

- **42 家主流机场品牌数据库 (`/brands/`)**：涵盖 IEPL 商业专线、IPLC 物理专线、BGP 跨境隧道等，支持按线路、协议、价格即时筛选。
- **节点实测中心 (`/reviews/`)**：晚高峰测速、带宽吞吐、丢包率与 4K/8K 流媒体/AI 原生解锁实测图库。
- **专线技术与抗封锁科普 (`/topics/`)**：万字专著级硬核长文，拆解跨境海底光缆、BGP 中转加密、VLESS XTLS 底层协议。
- **跑路预警雷达 (`/warnings/`)**：六大跑路前兆排查雷达与资金止损维权白皮书。
- **跨平台客户端大全 (`/clients/`)**：Windows、macOS、iOS、Android 全平台正版开源客户端下载指南。

---

## 🛠️ 技术栈 (Tech Stack)

| 领域               | 核心技术 / 方案                                                               |
| :----------------- | :---------------------------------------------------------------------------- |
| **基础框架**       | [Astro v7+](https://astro.build/) (Static Output Mode)                        |
| **样式与设计系统** | [Tailwind CSS v4](https://tailwindcss.com/) + Typography + CSS 自定义语义变量 |
| **交互组件**       | [Svelte v9](https://svelte.dev/) (用于客户端动态筛选、深浅主题切换、站内搜索) |
| **全文检索**       | [Pagefind](https://pagefind.app/) (跨 4 种语言的静态索引与检索)               |
| **代码高亮与公式** | Expressive Code + KaTeX (数学公式与网络拓扑高保真渲染)                        |
| **构建与包管理**   | pnpm + TypeScript 5+                                                          |

---

## 📁 目录结构 (Directory Structure)

```text
urbanvpn.my/
├── public/                 # 纯静态资源（高清测速原图、矢量 Favicon 等）
├── src/
│   ├── assets/             # 品牌 SVG 图标、站点 Banner
│   ├── components/         # Astro 与 Svelte 模块化组件
│   │   ├── brands/         # 品牌卡片、动态筛选器组件
│   │   ├── observatory/    # 测速数据看板、流媒体解锁矩阵
│   │   └── misc/           # SEO Head、Markdown 渲染、图片自适应组件
│   ├── config.ts           # 站点全局配置（主域、SEO、站长平台验证配置）
│   ├── content/            # Markdown 深度实测文章与测评归档
│   ├── data/               # 42 家机场品牌结构化核心数据库
│   ├── layouts/            # 基础 Layout、网格布局与全局 Header/Footer
│   ├── pages/              # Astro 动态路由与 XML Feeds 端点
│   └── utils/              # URL 格式化、日期转换与数据处理工具集
├── astro.config.mjs        # Astro 配置文件（集成 Sitemap、Partytown 等）
└── package.json            # 依赖与自动化构建脚本
```

---

## 🚀 本地开发与构建部署 (Getting Started)

### 1. 克隆代码仓库

```bash
git clone https://github.com/sksksk98698-source/urbanvpn.my.git
cd urbanvpn.my
```

### 2. 安装依赖环境

本项目强制使用 `pnpm` 进行依赖管理：
```bash
pnpm install
```

### 3. 启动本地开发服务

```bash
pnpm run dev
```
打开浏览器访问 `http://localhost:4321` 即可体验实时热更新。

### 4. 生产环境静态打包

```bash
pnpm run build
```
打包产物将自动输出至 `dist/` 目录，并同步生成 Pagefind 全文检索离线索引与 XML 网站地图。

### 5. 生产构建本地预览

```bash
pnpm run preview
```

---

## 🌐 生产部署建议 (Deployment)

推荐直接连接至现代边缘静态托管平台：

- **Cloudflare Pages (推荐)**：
  - 构建命令：`pnpm run build`
  - 输出目录：`dist`
  - 环境变量：`NODE_VERSION = 20` 或以上
- **Vercel / Netlify**：原生支持 Astro 静态生成部署。

---

## 📄 版权与许可 (License)

本项目代码与原创网络深度评测内容基于 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议发布。

---

<p align="center">
  由 <strong>urbanVPN 网络实验室</strong> 持续维护与构建 · 2026
</p>
