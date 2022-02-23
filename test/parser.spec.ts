import { expect } from "chai";
import { StyleParser } from "../src/parser";

describe("Parser", () => {
  describe("HTML", () => {
    it("should render template HTML without Body", () => {
      const render = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>test</title>
        <style></style>
      </head>
      <body></body>
    </html>    
    `;

      const obj = StyleParser.generateHTMLTemplate({
        head: {
          title: "test",
        },
      });

      expect(obj).to.be.equal(render);
    });
  });
});
