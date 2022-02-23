import { Theme } from "./themes";

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
        <title>${finalConfig.head?.title}</title>
        <style>
          ${finalConfig.head?.inlineStyles}
        </style>
      </head>
      <body>
        ${finalConfig.body}
      </body>
    </html>    
    `;
  }

  static generateStylesFromTheme(theme: Theme): string {
    return ``;
  }
}
