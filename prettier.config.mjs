import vercelPrettier from '@vercel/style-guide/prettier';

const prettierConfig = {
  ...vercelPrettier,
  plugins: [...vercelPrettier.plugins, 'prettier-plugin-tailwindcss'],
};

export default prettierConfig;
