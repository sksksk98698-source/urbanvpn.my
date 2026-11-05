import type {
	AnalyticsConfig,
	CommentConfig,
	DeployConfig,
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "urbanVPN",
	subtitle: "专业机场评测与网络可观测性数据库",
	lang: "zh_CN", // Default to zh_CN
	supportedLangs: ["zh_CN", "en", "zh_TW", "ja"],
	theme: {
		hue: 215, // Cyber Blue hue for security & network branding
		mode: "light",
	},
	banner: {
		enable: true,
		src: "assets/images/banner.svg",
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true,
		depth: 3,
	},
	favicon: [],
	ogImage: {
		useDefault: true,
		defaultSrc: "/media/images/banner.svg",
	},
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		{
			name: "机场品牌库",
			url: "/brands/",
		},
		{
			name: "实测中心",
			url: "/reviews/",
		},
		{
			name: "客户端大全",
			url: "/clients/",
		},
		{
			name: "专线科普",
			url: "/topics/",
		},
		LinkPreset.About,
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.svg",
	name: "urbanVPN",
	bio: "专业网络可观测性评测中心 · 42家主流机场深度实测、晚高峰延迟与真实流媒体/AI解锁数据。",
	links: [
		{
			name: "品牌库",
			icon: "fa6-solid:server",
			url: "/brands/",
		},
		{
			name: "RSS",
			icon: "fa6-solid:rss",
			url: "/rss.xml",
		},
		{
			name: "关于",
			icon: "fa6-regular:address-card",
			url: "/about/",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};

// Comment configuration (Clean & independent: disabled by default to protect user privacy)
export const commentConfig: CommentConfig = {};

// Site analytics config (GA4 or privacy-first self-hosted analytics)
export const analyticsConfig: AnalyticsConfig = {
	enabled: false,
};

// Deploy configuration
export const deployConfig: DeployConfig = {
	siteUrl: "https://urbanvpn.my",
	baseUrl: "/",
};
