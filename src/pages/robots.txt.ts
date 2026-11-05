import { siteUrl } from "@utils/url-utils";
import type { APIRoute } from "astro";

const robotsTxt = `
User-agent: *
Allow: /
Disallow: /api/

User-agent: Googlebot
Allow: /
Disallow: /api/

User-agent: bingbot
Allow: /
Disallow: /api/

User-agent: Baiduspider
Allow: /
Disallow: /api/

User-agent: yisouspider
Allow: /
Disallow: /api/

Sitemap: ${siteUrl("sitemap-index.xml")}
Sitemap: ${siteUrl("sitemap.xml")}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
