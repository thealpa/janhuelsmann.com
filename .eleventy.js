module.exports = function (eleventyConfig) {
	const { DateTime } = require("luxon");
	const markdownIt = require('markdown-it');
	const markdownItAttrs = require('markdown-it-attrs');
	eleventyConfig.addPassthroughCopy("src/style.css");
	eleventyConfig.addPassthroughCopy("src/img/*");
	eleventyConfig.addPassthroughCopy("src/robots.txt");
	eleventyConfig.addPassthroughCopy("src/favicon.svg");
	eleventyConfig.addPassthroughCopy("src/favicon.ico");
	eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");
	eleventyConfig.addPassthroughCopy("src/manifest.webmanifest");
	eleventyConfig.addPassthroughCopy("src/icon-192.png");
	eleventyConfig.addPassthroughCopy("src/icon-512.png");
	
	eleventyConfig.setBrowserSyncConfig({
		middleware: [
			function (req, res, next) {
				if (/^[^.]+$/.test(req.url)) {
					res.setHeader('Content-Type', 'text/html; charset=utf-8');
				}
				next();
			}
		]
	});
	
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, {
			zone: "Europe/Berlin",
		}).setLocale('en').toISODate();
	});
	
	const markdownItOptions = {
	  html: true,
	  breaks: true,
	  linkify: true
	}
	
	const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
	eleventyConfig.setLibrary('md', markdownLib);
	
	return {
		dir: {
			input: "src",
			output: "dist",
		},
	};
};