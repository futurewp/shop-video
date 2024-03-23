module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: [['import', { libraryName: 'vant', libraryDirectory: 'es', style: name => `${name}/style/less` }, 'vant']]
}
