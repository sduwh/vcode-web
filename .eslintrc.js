module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'airbnb-base', // airbnb lint规范
    'plugin:vue/essential', // eslint-plugin-vue
    'plugin:prettier/recommended', // eslint-config-prettier
  ],
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: 'build/webpack.base.conf.js',
  //     },
  //   },
  // },
  // plugins: ['vue'],
  rules: {
    'prettier/prettier': 1,
    'no-undef': 2,
    'no-extend-native': 2,
    'no-return-assign': 2,
    'import/order': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 1,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 1,
    'vue/no-async-in-computed-properties': 1,
    'vue/no-side-effects-in-computed-properties': 1,
    'vue/no-reserved-keys': 1,
    'vue/require-v-for-key': 2,
    'vue/require-valid-default-prop': 1,
    'no-unused-vars': 1,
    'generator-star-spacing': 0,
    'no-plusplus': 0,
    'func-names': 0,
    'no-console': 0,
    radix: 0,
    'no-control-regex': 0,
    'no-continue': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-param-reassign': 1,
    'no-underscore-dangle': 1,
    'global-require': 1,
    'no-var': 1,
    'vars-on-top': 1,
    'prefer-destructuring': 1,
    'no-useless-concat': 1,
    'no-shadow': 1,
    'guard-for-in': 1,
    'no-restricted-syntax': 1,
    'global-require': 1,
    'consistent-return': 1,
    eqeqeq: 1,
    'no-unused-expressions': 1,
    camelcase: 1,
    'block-scoped-var': 1,
    'no-redeclare': 1,
    'prefer-arrow-callback': 1,
    'array-callback-return': 1,
    'default-case': 1,
    'no-loop-func': 1,
    'no-fallthrough': 1,
    'no-multi-assign': 1,
    'no-lonely-if': 1,
    'no-irregular-whitespace': 1,
    'prefer-const': 1,
    'no-use-before-define': 1,
    'no-useless-escape': 1,
    'no-array-constructor': 1,
    'object-shorthand': 1,
    'no-prototype-builtins': 1,
    'no-nested-ternary': 1,
    'no-new-wrappers': 1,
    'prefer-promise-reject-errors': 1,
    'no-labels': 1,
  },
};
