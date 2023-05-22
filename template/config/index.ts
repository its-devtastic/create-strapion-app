import {
  StrapionConfig,
  dashboardPlugin,
  contentManagerPlugin,
  mediaLibraryPlugin,
} from "strapion";

const strapionConfig: StrapionConfig = {
  strapiUrl: import.meta.env.VITE_STRAPI_URL,
  icon: "/icon.png",
  title: "My Strapion CMS",
  zones: [],
  routes: [],
  contentTypes: [],
  components: [],
  hooks: [],
  interfaceLanguages: ["en"],
  plugins: [
    dashboardPlugin({
      recentlyOpened: {
        renderTitle(item: any) {
          switch (item.apiID) {
            case "page":
              return item.title;
          }
        },
      },
    }),
    contentManagerPlugin({
      groups: [
        { label: "content_groups.collections", items: ["page"] },
        { label: "content_groups.pages", items: ["homepage"] },
      ],
    }),
    mediaLibraryPlugin(),
  ],
};

export default strapionConfig;
