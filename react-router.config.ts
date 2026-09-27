import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src/app",
  basename: "/",
  async prerender() {
    return [
      "/",
      "/o-nama",
      "/usluge",
      "/galerija",
      "/kontakt",
      "/dj-za-korporativni-dogadaj",
      "/dj-za-proslave",
      "/dj-za-vjencanja",
      "/politika-privatnosti",
      "/uvjeti-koristenja",
      "/blog",
      "/blog/kako-odabrati-dj-a-za-vjencanje",
      "/blog/najbolja-glazba-za-evente",
    ];
  },
  routeDiscovery: {
    mode: "initial",
  },
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;

