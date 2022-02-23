import { Theme } from "./themes";
import DOMPurify from "dompurify";

export interface StyleParserArgs {
  head?: {
    links?: { href: string; rel: string }[];
    scripts?: string[];
    title?: string;
    inlineStyles?: string;
  };
  body?: string;
}

const DefaultParserArgs: StyleParserArgs = {
  head: {
    links: [],
    scripts: [],
    title: "PrettyMarkdown",
    inlineStyles: "",
  },
  body: "",
};

export class StyleParser {
  constructor() {}

  static generateHTMLTemplate(config: StyleParserArgs) {
    const finalConfig = { ...DefaultParserArgs, ...config };

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${finalConfig.head?.title || ""}</title>
        ${
          finalConfig.head?.inlineStyles
            ? `
        <style>
          ${finalConfig.head?.inlineStyles}
        </style>
          `
            : "<style></style>"
        }
      </head>
      ${
        finalConfig.body
          ? `
      <body>
        ${finalConfig.body || ""}
      </body> 
        `
          : "<body></body>"
      }
    </html>    
    `;
  }

  static generateStylesFromTheme(theme: Theme): string {
    return `
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      body {
        padding: ${theme.config.margins}px;
        background: ${theme.config.background};
        color: ${theme.config.color};
      }

      h1, h2, h3, h4, h5, h6 {
        font-weight: 600;
      }

      p {
        font-weight: 400;
      }

      code {
        padding: ${theme.config.margins * 0.25};
        font-family: monospace, sans-serif;
        font-size: ${theme.config.margins * 0.25}
      }
    `;
  }

  static sanitizeDom(render: string): string {
    return DOMPurify.sanitize(render);
  }
}
