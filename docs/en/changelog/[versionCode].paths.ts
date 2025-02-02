import { changelog } from "../../data/changelog";

export default {
  paths() {
    return changelog.map((log) => {
        return {
          params: {
            title: log.versionName + " (" + log.versionCode + ")",
            versionName: log.versionName,
            versionCode: log.versionCode,
            preRelease: log.preRelease,
          },
          content: log.changes
        };
      });
  },
};
