let mix = require("laravel-mix");
let fs = require("fs");

class WordPressThemeJsonPlugin {
	register(themeJsonPath, outputPath) {
		this.config = {
			themeJsonPath,
			outputPath,
		};
		this.convert();
	}

	convert() {
		let rawdata = fs.readFileSync(this.config.themeJsonPath);
		let theme = JSON.parse(rawdata);

		let scssJson = {};

		scssJson.colors = {};
		for (
			let index = 0;
			index < theme.settings.color.palette.length;
			index++
		) {
			const element = theme.settings.color.palette[index];
			scssJson.colors[element.slug] = element.color;
		}

		let data = JSON.stringify(scssJson, null, 2);
		fs.writeFileSync(this.config.outputPath, data);
	}
}

mix.extend("wpThemeJson", new WordPressThemeJsonPlugin());
