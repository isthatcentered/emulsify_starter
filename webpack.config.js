const path = require( "path" )
const glob = require( "glob" )
const fs = require( "fs" )

const pathToName = path =>
	// -> ["..", "stuff", "stuff-item.js"]
	[ ...path.split( "/" ) ]
	// -> "stuff-item.js"
		.pop()
		// -> "stuff-item"
		.slice( 0, -3 )

const getEntries = path =>
	glob
	// Returns string array of file paths
	// -> ["../global.js", "../other.js"]
		.sync( path )

		// Map to {key: val} array
		// -> [ { '0': '../global.js' }, { '0': '../global.js' }]
		.map( ( path, ind ) => ({
			[ pathToName( path ) ]: path
		}) )
		// Reduce to object dictionnary
		// -> {0: "../global.js", 2: "../other.js"}
		.reduce( ( acc, curr ) => ({
			...acc,
			...curr
		}), {} )

const DIST = path.resolve( __dirname, "dist" )
const PATHS = {
	SCRIPTS: {
		SRC: "./components/_patterns/**/*.js",
		DIST: path.join(DIST, "scripts/")
	}
}

module.exports = {
	entry: getEntries( PATHS.SCRIPTS.SRC ),
	output: {
		filename: "[name].bundle.js",
		path: PATHS.SCRIPTS.DIST
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[ "env", {
								targets: {
									browsers: [ "since 2013" ],
								},
							} ],
						],
						plugins: [
							"transform-class-properties", // Allows method = _ => {}
							"transform-object-rest-spread"
						]
					},
				},
			},
		]
	}
}