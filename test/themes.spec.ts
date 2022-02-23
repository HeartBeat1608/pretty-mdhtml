import { config, expect } from "chai";
import { Theme, DefaultThemes, ThemeArgs } from "../src/themes";

describe("Themes", () => {
  describe("Deafults", () => {
    it("should have default theme as 'dark'", () => {
      let obj = new Theme();
      expect(obj.themeMode).to.be.equal("dark");
    });

    it("should have default theme config", () => {
      let obj = new Theme();
      expect(obj.config).to.deep.equal(DefaultThemes["dark"]);
    });

    it("should have 'light' theme", () => {
      let obj = new Theme("light");
      expect(obj.themeMode).to.equal("light");
    });

    it("should have 'light' theme config", () => {
      let obj = new Theme("light");
      expect(obj.config).to.deep.equal(DefaultThemes["light"]);
    });
  });

  describe("Overrides", () => {
    it("should override the default 'dark' theme background", () => {
      let obj = new Theme("light", { background: "red" });
      expect(obj.config.background).to.equal("red");
    });

    it("should parital override default config", () => {
      let themeConfig: Partial<ThemeArgs> = {
        background: "red",
        code: "white",
      };
      let obj = new Theme("light", themeConfig);
      expect({
        background: obj.config.background,
        code: obj.config.code,
      }).to.deep.equal({
        background: themeConfig.background,
        code: themeConfig.code,
      });
    });

    it("should have fully override default config", () => {
      let themeConfig: ThemeArgs = {
        background: "red",
        code: "white",
        headings: "#432",
        margins: 12,
      };
      let obj = new Theme("light", themeConfig);
      expect(obj.config).to.deep.equal(themeConfig);
    });

    it.skip("should load the new theme directly from the object", () => {
      let obj = new Theme("light", {});
      expect(obj.config).to.be.undefined;
    });
  });
});
