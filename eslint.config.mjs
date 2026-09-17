import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptConfig from "eslint-config-next/typescript";

/**
 * Next.js ships native flat configs from v16, so no FlatCompat bridge here.
 */
const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "public/**"] },
  ...coreWebVitals,
  ...typescriptConfig,
];

export default eslintConfig;
