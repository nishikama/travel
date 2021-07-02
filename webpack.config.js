// [定数] webpack の出力オプションを指定しす
// 'production' か 'development' を指定
const MODE = 'production';

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
	// モード値を production に設定すると最適化された状態で、
	// development に設定するとソースマップ有効でJSファイルが出力される
	mode: MODE,

	// source-map 方式でないと、CSSの元ソースが追跡できないため
	devtool: 'source-map',

	// メインとなるJavaScriptファイル（エントリーポイント）
	entry: './src/js/index.js',

	// ファイルの出力設定
	output: {
		//  出力ファイルのディレクトリ名
		path: path.resolve(__dirname, 'dist'),
		// 出力ファイル名
		filename: 'js/bundle.js',
	},

	module: {
		rules: [
			// Sassファイルの読み込みとコンパイル
			{
				test: /\.(scss|css)/, //対象となるファイルの拡張子
				use: [
					// linkタグに出力する機能
					'style-loader',
					// CSSをバンドルするための機能
					{
						loader: 'css-loader',
						options: {
							// オプションでCSS内のurl()メソッドの取り込みを禁止する
							url: false,
							// ソースマップの利用有無
							sourceMap: enabledSourceMap,

							// 0 => no loaders (default);
							// 1 => postcss-loader;
							// 2 => postcss-loader, sass-loader
							importLoaders: 2,
						},
					},
					// PostCSSのための設定
					{
						loader: 'postcss-loader',
						options: {
							// PostCSS側でもソースマップを有効にする
							// sourceMap: true,
							postcssOptions: {
								plugins: [
									// Autoprefixerを有効化
									// ベンダープレフィックスを自動付与する
									['autoprefixer', { grid: true }],
								],
							},
						},
					},
					// Sassをバンドルするための機能
					{
						loader: 'sass-loader',
						options: {
							// ソースマップの利用有無
							sourceMap: enabledSourceMap,
						},
					},
				],
			},
			{
				// 対象となるファイルの拡張子
				test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
				// 画像をBase64として取り込む
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 4 * 1024, // <--- 4kb
					},
				},
			},
			{
				// 拡張子 .js の場合
				test: /\.js$/,
				// ローダーの処理対象から外すディレクトリ
				exclude: /node_modules/,
				use: [
					{
						// Babel を利用する
						loader: 'babel-loader',
						// Babel のオプションを指定する
						options: {
							presets: [
								// プリセットを指定することで、ES2018 を ES5 に変換
								'@babel/preset-env',
							],
						},
					},
				],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicons: './src/favicon.ico',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
	],
	// ローカル開発用環境を立ち上げる
	// 実行時にブラウザが自動的に localhost を開く
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		open: false,
	},
	// ES5(IE11等)向けの指定
	target: ['web', 'es5'],
};
