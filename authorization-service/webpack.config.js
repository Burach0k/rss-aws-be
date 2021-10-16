const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const lambdasDir = path.join(__dirname, 'src/lambdas');

module.exports = {
  context: __dirname,
  entry: findLambdaFilesPath(),
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, 'swagger'),
          ],
        ]
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^pg-native$/,
    }),
  ]
};

function findLambdaFilesPath() {
  const filesName = fs.readdirSync(lambdasDir);

  return filesName
    .filter(fileName => fileName.includes('.lambda.ts'))
    .map(mapFileObjectInfo)
    .reduce(reduceEntryFilesInfo, {})
}

function mapFileObjectInfo(fileName) {
  return {
    name: fileName.split('.')[0],
    path: `./src/lambdas/${fileName}`
  }
}

function reduceEntryFilesInfo(entry, file) {
  entry[file.name] = file.path;
  return entry;
}
