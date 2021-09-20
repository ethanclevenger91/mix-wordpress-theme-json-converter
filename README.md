# Introduction
When writing a modern WordPress theme, a `theme.json` is used to fine-tune the editing experience within the block editor.

Many of the values here would be helpful to re-use within your theme's Sass. While you could leverage the CSS variables that WordPress generates, these variables aren't compatible with Sass magic like `lighten`, `darken`, etc.

This library parses your `theme.json` file and places it into a JSON file that can be imported into your own Sass files via [`node-sass-json-importer`](https://www.npmjs.com/package/node-sass-json-importer) It's been wrapped for usage with Laravel Mix. Abstraction is planned.

# Example
```
// theme.json
{
  "version": 1,
  "settings": {
    "layout": {
      "contentSize": "1320px"
    },
    "color": {
      "palette": [
        {
          "name": "Primary",
          "slug": "primary",
          "color": "#000000"
        },
        {
          "name": "Secondary",
          "slug": "secondary",
          "color": "#ffffff"
        }
      ]
    }
  },
  "styles": {},
  "customTemplates": {},
  "templateParts": {}
}
```
```
// webpack.mix.js
const mix = require('laravel-mix');
const jsonImporter = require('node-sass-json-importer');
require('mix-wordpress-theme-json-converter');

mix.setPublicPath("")
	.sass("sass/app.scss", "dist/", {
		sassOptions: {
            importer: jsonImporter(),
        }
	})
    .wpThemeJson('./theme.json', './sass/base/theme.json');
```
```
// output (base/theme.json)

{
  "colors": {
    "primary": "#000000",
    "secondary": "#ffffff"
  }
}
```
```
// usage
// app.scss
@import 'base/theme.json';
@import 'base/variables';

// base/variables.scss
// optional: map to Bootstrap variables
$primary: map-get($colors, 'primary');
$secondary: map-get($colors, 'secondary');
```

# Current Mappings
| `theme.json` setting      | Variable output |
| ----------- | ----------- |
| `settings.color.palette`      | `$colors`       |