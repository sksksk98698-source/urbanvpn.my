# UrbanVPN

A high-performance, modern, and SEO-optimized web platform for **UrbanVPN** (`https://urbanvpn.my`). Built with Astro, Tailwind CSS, Svelte, and TypeScript.

## Core Features

- **Next-Gen Speed**: Built on top of Astro 5+ with static site generation (SSG) for ultra-fast load times.
- **Deep Clean & Zero External Leaks**: 100% independent URL routing and asset hosting with zero external trackers, zero telemetry, and strict privacy preservation.
- **Full SEO & Structured Data**: Complete Schema.org JSON-LD (WebSite, BlogPosting), OpenGraph, Twitter cards, automated XML Sitemap index, and robots.txt.
- **Responsive & Modern UI**: Cyber-minimalist dark/light adaptive theme, typography optimization, and smooth client-side transitions.
- **Multi-language Ready**: Comprehensive internationalization architecture supporting multiple languages.

## Project Structure

```text
├── public/              # Static assets, vector favicons, robots.txt
├── src/
│   ├── assets/          # Brand images, banners, and vector avatars
│   ├── components/      # Astro and Svelte interactive components
│   ├── config.ts        # Centralized site, profile, and deployment configuration
│   ├── content/         # Markdown posts and specs
│   ├── layouts/         # Base layout and main grid layout with SEO metadata
│   ├── pages/           # File-based routing and XML feed endpoints
│   └── styles/          # Global styles, Tailwind directives, and CSS variables
```

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Local Development

```bash
pnpm run dev
```

### 3. Build for Production

```bash
pnpm run build
```

### 4. Preview Production Build

```bash
pnpm run preview
```

## License

MIT License. Copyright (c) 2026 UrbanVPN.
