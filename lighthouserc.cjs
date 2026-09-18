module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3010/",
        "http://localhost:3010/products",
        "http://localhost:3010/products/raw-whole-spices/cumin-seeds",
      ],
      numberOfRuns: 3,
      settings: { preset: "desktop", chromeFlags: "--headless=new --no-sandbox" },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["warn", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 1 }],
      },
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};
