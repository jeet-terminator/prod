const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function(env, { mode }) {

  console.log({ env , mode })

  const production = mode === 'production';

  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-map' : 'inline-source-map',
    entry: './ui/index.ts', // Point d'entrée de votre application
    output: {
      path: path.resolve(__dirname, 'public/build'), // Répertoire de sortie
      filename: 'bundle.js', // Nom du fichier de sortie
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.ts', '.js' , ".svg"], // Extensions de fichiers à résoudre
      fallback : {
        "fs": false, // Par exemple, si vous rencontrez des erreurs avec le module "fs"
        "path": require.resolve("path-browserify"),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/, // Appliquer ts-loader aux fichiers TypeScript
          exclude: /node_modules/, // Ne pas appliquer aux dépendances installées via npm
          use: 'ts-loader', // Utiliser ts-loader
        },
        {
          test: /\.js$/, // Appliquer Babel aux fichiers JavaScript
          exclude: /node_modules/, // Ne pas appliquer aux dépendances installées via npm
          use: {
            loader: 'babel-loader', // Utiliser Babel
            options: {
              presets: ['@babel/preset-env'], // Utiliser le preset @babel/preset-env
            },
          },
        },
        {
          test: /\.scss$/, // Appliquer les loaders aux fichiers SCSS
          use: [
            { 
              loader : 'style-loader',
              options: {
                insert : 'main-application'
              },
            }, // Injecter les styles dans le DOM
            'css-loader', // Convertir les fichiers CSS en modules JS
            'postcss-loader', // Utiliser PostCSS pour traiter les fichiers CSS
            'sass-loader', // Convertir les fichiers SCSS en CSS
          ],
        },
        {
          test: /\.css$/, // Appliquer les loaders aux fichiers CSS
          use: [
            { 
              loader : 'style-loader',
            }, // Injecter les styles dans le DOM
            'css-loader', // Convertir les fichiers CSS en modules JS
            'postcss-loader', // Utiliser PostCSS pour traiter les fichiers CSS
          ],
        },
        {
          test: /\.svg$/,
          use: [
              {
                  loader: "svg-inline-loader",
                  options: {
                      removeSVGTagAttrs: false,
                  },
              },
          ],
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        dangerouslyAllowCleanPatternsOutsideProject : true
      }),
      // new HtmlWebpackPlugin({
      //   template: "./public/index.html",
      // }),
    ],
    devServer: {
      port: 9000,
      historyApiFallback: true,
      open: !process.env.CI,
      devMiddleware: {
        writeToDisk: true,
      },
      static: {
        directory: path.join(__dirname, './public')
      }
    },
  }

};