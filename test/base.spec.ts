import { expect } from "chai";
import { PrettyMarkdown } from "../src/index";

describe("PrettyMarkdown", () => {
  describe("Loader", () => {
    it("should load instance from markdown string", () => {
      let obj: PrettyMarkdown | undefined;
      obj = PrettyMarkdown.fromMarkdown("## Some Markdown Content");

      expect(obj).to.not.be.undefined;
      // if (obj == undefined) done(new Error("Could not load markdown"));
      // else done();
    });

    it("should load instance from markdown file", async () => {
      const filepath = "./example/sample1.md";
      const obj = await PrettyMarkdown.fromPath(filepath);

      expect(obj).to.not.be.undefined;
    });
  });

  describe("Contents", () => {
    it("should have content after loading", () => {
      const content = "#Sample Content";
      let obj = PrettyMarkdown.fromMarkdown(content);
      expect(obj.rawContent).to.equal(content);
    });

    it("should not have contents without arguments", () => {
      let obj = new PrettyMarkdown();
      expect(obj.rawContent).to.be.undefined;
    });
  });
});
