import "dotenv/config";

const nhostSubdomain = process.env.NHOST_SUBDOMAIN;
const nhostRegion = process.env.NHOST_REGION;

export default {
  expo: {
    name: "ChaldeanNumbers",
    slug: "ChaldeanNumbers",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.alexandrecisse.ChaldeanNumbers",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.alexandrecisse.ChaldeanNumbers",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "f70501be-c93c-4a8d-9b30-fcdf3717a321",
      },
      nhostSubdomain: nhostSubdomain,
      nhostRegion: nhostRegion,
    },
  },
};
