
// https://www.cnblogs.com/BlackStorm/p/add-stylelint-to-your-vue-project.html
// https://github.com/stylelint/stylelint-config-standard
// stylus 目前没有发现可用性高的相关插件，也导致 stylelint 不能解析 stylus 语法
// https://stylelint.io/user-guide/rules/ 规则

// stylelint.config.js
module.exports = {
  'defaultSeverity': 'error',
  // 扩展配置
  // https://github.com/stylelint/stylelint-config-standard
  // https://github.com/prettier/stylelint-config-prettier
  // 关闭所有不必要或可能与Prettier冲突的规则。这使您可以使用自己喜欢的可共享配置，而不会在使用Prettier时让其风格选择受到影响。
  'extends': ['stylelint-config-standard'],
  // 'plugins': ['stylelint-scss'],
  'rules': {
    // 不要使用已被 autoprefixer 支持的浏览器前缀
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'property-no-vendor-prefix': [true, {
      ignoreProperties: ['appearance', 'text-size-adjust'],
    }],
    'value-no-vendor-prefix': true,
  },
}
