/* eslint-disable */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json", "./apps/*/tsconfig.json"],
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "react",
    "jsx-a11y",
    "import",
    "react-hooks"
  ],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "react/destructuring-assignment": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/no-array-index-key": "off",
    "react/no-access-state-in-setstate": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/no-unused-state": "off",
  },
};
