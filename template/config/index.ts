import { StrapionConfig } from "strapion";

const strapionConfig: StrapionConfig = {
  strapiUrl: import.meta.env.VITE_STRAPI_URL,
  icon: "/icon.png",
  title: "My Strapion CMS",
  zones: [],
  routes: [],
  contentTypes: [],
  components: [],
  interfaceLanguages: ["en"],
  theme: { token: { controlHeight: 38 } },
  plugins: [
    {
      name: "contentManager",
      options: {
        groups: [{ label: "", items: [] }],
      },
    },
    { name: "mediaLibrary" },
  ],
};

export default strapionConfig;
