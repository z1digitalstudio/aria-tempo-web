import type { NextConfig } from "next";

// https://react-svgr.com/docs/next/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function svgLoader(config: any) {
  // Grab the existing rule that handles SVG imports
  const fileLoaderRule = config.module.rules.find(
    (rule: { test: { test: (ext: string) => unknown } }) =>
      rule.test?.test?.(".svg")
  );

  config.module.rules.push(
    // Reapply the existing rule, but only for svg imports ending in ?url
    {
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/, // *.svg?url
    },
    // Convert all other *.svg imports to React components
    {
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // https://react-svgr.com/docs/options/
            svgoConfig: {
              plugins: [
                {
                  name: "addAttributesToSVGElement",
                  params: {
                    attributes: [
                      { "aria-hidden": "true" },
                      { focusable: "false" },
                    ],
                  },
                },
                {
                  name: "convertColors",
                  params: {
                    currentColor: true,
                  },
                },
              ],
            },
          },
        },
      ],
    }
  );
  // Modify the file loader rule to ignore *.svg, since we have it handled now.
  fileLoaderRule.exclude = /\.svg$/i;

  return config;
}

const nextConfig: NextConfig = {
  webpack(config) {
    svgLoader(config);

    return config;
  },
};

export default nextConfig;
