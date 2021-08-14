/**
 * Created by Fred(qq:24242811) on 2018/6/12.
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry:'./src/index.js',
	output:{
		filename:'bundle.[hash].js',
		path:path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015','stage-0', 'react'],
						plugins:[["import", { "libraryName": "antd-mobile", "style": true }]]
					}
				},
				exclude: /node_modules/,
				include:[/src/,/..\/constants/],
			},
			{
				test:/\.css$/,
				use:['style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: false,
							localIdentName: '[name]__[local]-[hash:base64:5]'
						}
					},
				]
			},
			{
				test:/\.(png|jpg|jpeg|gif)$/,
				use:[{
					loader:'file-loader',
					options:{
						name: '[hash].[ext]',
						outputPath: 'images/'
					}
				}]
			},
			{
				test:/\.(woff|svg|eot|ttf)\??.*$/,
				use:[{
					loader: 'url-loader?limit=50000&name=[path][name].[ext]'
				}]
			},
			{
				test: /\.less$/,
				include:/node_modules/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader',
				}, {
					loader: 'less-loader',
					options: { javascriptEnabled: true }
				}]
			},
			{
				test: /\.less$/,
				exclude:/node_modules/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader',
					options: {
						modules: true,
						localIdentName: '[name]__[local]-[hash:base64:5]'
					}
				}, {
					loader: 'less-loader',
					options: { javascriptEnabled: true }
				}]
			}
		]
	},
	node: {
		fs: 'empty'
	},
	mode:'development',
	plugins: [
		new HtmlWebpackPlugin({
			template:'src/index.ejs',
			templateParameters:{
				SERVER_HOME:'http://s.stgame.cn/k1/client/v1/',
				IS_DEBUG:true
			}
		})
	],
	devServer:{
		contentBase:path.join(__dirname, "dist"),
		compress:true,
		open:true,
		// host:'192.168.31.153',
		port:9006
	}
}
