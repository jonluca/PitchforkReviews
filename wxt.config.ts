import { defineConfig } from "wxt";

export default defineConfig({
  manifestVersion: 3,
  targetBrowsers: ["chrome", "edge", "firefox", "safari"],
  manifest: ({ browser }) => ({
    name: "Pitchfork Reviews",
    description: "Show album scores directly on Pitchfork review listing pages.",
    version: "2.1.0",
    homepage_url: "https://github.com/jonluca/PitchforkReviews/",
    icons: {
      32: "images/icon32.png",
      64: "images/icon64.png",
      128: "images/icon128.png"
    },
    ...(browser === "firefox"
      ? {
          browser_specific_settings: {
            gecko: {
              id: "pitchfork-reviews@jonlu.ca",
              strict_min_version: "140.0",
              data_collection_permissions: { required: ["none"] }
            },
            gecko_android: {
              strict_min_version: "142.0"
            }
          }
        }
      : {})
  })
});
