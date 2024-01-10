module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    jest: true
  },
  extends: ["airbnb-base", "plugin:jest/recommended", "plugin:security/recommended", "prettier"],
  plugins: ["jest", "security", "prettier"],
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "no-console": "error",
    "func-names": "off",
    "no-underscore-dangle": "off",
    "consistent-return": "off",
    "jest/expect-expect": "off",
    "security/detect-object-injection": "off",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
  }
}