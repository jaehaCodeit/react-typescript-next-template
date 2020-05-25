require('dotenv').config();

const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const path = require('path');
const withSourceMaps = require('@zeit/next-source-maps')();

module.exports = withSass(
	withCSS(
		withSourceMaps({
			webpack: (config, options) => {
				config.resolve.alias['components'] = path.join(__dirname, 'components');
				config.resolve.alias['interfaces'] = path.join(__dirname, 'interfaces');
				config.resolve.alias['pages'] = path.join(__dirname, 'pages');
				config.resolve.alias['stores'] = path.join(__dirname, 'stores');
				config.resolve.alias['layouts'] = path.join(__dirname, 'layouts');
				config.resolve.alias['public'] = path.join(__dirname, 'public');
				config.resolve.alias['utils'] = path.join(__dirname, 'utils');
				config.resolve.alias['api'] = path.join(__dirname, 'api');
				config.module.rules.push({
					test: /\.svg$/,
					use: ['@svgr/webpack'],
				});
				config.module.rules.push({
					test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 100000,
						},
					},
				});

				return config;
			},
		}),
	),
);
