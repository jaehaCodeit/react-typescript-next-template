const env = require('./env-config.js')

module.exports = {
	"presets": ["next/babel", "@zeit/next-typescript/babel"],
	"plugins": [
		"inline-react-svg",
		["@babel/plugin-proposal-decorators", {
			"legacy": true
		}],
		["@babel/plugin-proposal-class-properties", {
			"loose": true
		}],
		["@babel/plugin-transform-template-literals", {
			"loose": true
		}],
		[
			"module-resolver",
			{
				"root": ["./"],
				"alias": {
					"@Components": "./src/Components",
					"@Interfaces": "./src/Interfaces"
				}
			}
    ],
    ["transform-define", env]
	]
}