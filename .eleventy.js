module.exports = function (eleventyConfig) {
	const { DateTime } = require("luxon");
	const { JSDOM } = require("jsdom");
	const markdownIt = require('markdown-it');
	const markdownItAttrs = require('markdown-it-attrs');
	var sizeOf = require('image-size');
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
	
	eleventyConfig.addTransform("retinaImg", function(content, outputPath) {
		if (outputPath.endsWith('')) {
			const dom = new JSDOM(content);
			const document = dom.window.document;
			const imageElements = document.querySelectorAll('img');
			
			if (imageElements.length === 0) {
				return content;
			}
			
			for (const imgElement of imageElements) {
				const imgSrc = imgElement.getAttribute('src');
				
				if (imgSrc.startsWith('/img/')) {
					
					let dimensions = sizeOf('src' + imgSrc);
					imgElement.setAttribute('width', dimensions.width);
					imgElement.setAttribute('height', dimensions.height);
					
					let srcSet = [];
					let srcString = imgSrc.split('.')
					let imgSrc2x = srcString[0] + '@2x.' + srcString[1]
					let imgSrc3x = srcString[0] + '@3x.' + srcString[1]
					srcSet.push(imgSrc2x + ' 2x');
					srcSet.push(imgSrc3x + ' 3x');
					srcSet = srcSet.join(', ');
					imgElement.setAttribute('srcset', srcSet);
				}
			}
			return '<!DOCTYPE html>' + document.documentElement.outerHTML;
		}
		return content;
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