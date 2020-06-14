module.exports = {
	presets: [
		['@babel/preset-env',
			{
				useBuiltIns: "usage",
				corejs: 3
			}
		],
		['@babel/preset-typescript']
	],

	plugins: [
		// ['@babel/plugin-transform-runtime', {
		// 	modules: false,
		// 	corejs: 3,
		// 	proposals: true
		// }],
		'@babel/plugin-syntax-dynamic-import',
		'@babel/proposal-class-properties',
		'@babel/proposal-object-rest-spread'
	]
}
