import { marked } from "marked";
import { PathLike } from "fs";
import { readFile } from "fs/promises";
import { Theme, ThemeMode } from "./themes";
import { StyleParser } from "./parser";

/**
 * Instantiate an object to operate on the makrdown contents
 */
export class PrettyMarkdown {
  private _content: string | undefined;
  private _title: string = "Render | PrettyMarkdown";

  /**
   * Create a PrettyMarkdown instance with the given markdown content
   * @param mdContent Markdown Content
   */
  constructor(mdContent?: string, title?: string) {
    this._content = mdContent;
  }

  /**
   * Load a markdown file from path.
   * @param path Path of the source file to load
   * @returns PrettyMarkdown instance from the file
   */
  static async fromPath(path: PathLike): Promise<PrettyMarkdown> {
    const markdownContent = await readFile(path, {
      encoding: "utf-8",
    });

    return new PrettyMarkdown(markdownContent);
  }

  /**
   * Create a new instance from the given markdown content.
   * @param mdContent Markdown Content
   * @returns Parsed instance of the PrettyMarkdown class
   */
  static fromMarkdown(mdContent: string): PrettyMarkdown {
    return new PrettyMarkdown(mdContent);
  }

  /**
   * Get Raw Markdown Content of the source
   */
  public get rawContent(): string | undefined {
    return this._content;
  }

  /**
   * Convert markdown to HTML using `marked` package
   * @returns HTML markup of the Markdown source
   */
  toHTML(): string {
    return StyleParser.generateHTMLTemplate({
      body: marked(this._content || ""),
      head: {
        title: this._title,
      },
    });
  }

  /**
   * Convert default HTML to styled HTML using themeing and styling
   * @param theme Theme to be used for style rendering
   * @returns Themed HTML with styles in the page for better UI
   */
  toThemedHTML(theme: Theme | ThemeMode): string {
    const html = marked(this._content || "");
    const parseTheme =
      theme instanceof Theme ? theme : Theme.getDefaultTheme(theme);

    const styles = StyleParser.generateStylesFromTheme(parseTheme);
    const renderedHtml = StyleParser.generateHTMLTemplate({
      body: html,
      head: {
        inlineStyles: styles,
        title: this._title,
      },
    });

    return StyleParser.sanitizeDom(renderedHtml);
  }
}
