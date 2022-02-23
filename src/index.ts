// import { marked } from "marked";
import { PathLike } from "fs";
import { readFile } from "fs/promises";

/**
 * Instantiate an object to operate on the makrdown contents
 */
export class PrettyMarkdown {
  private _content: string | undefined;

  /**
   * Create a PrettyMarkdown instance with the given markdown content
   * @param mdContent Markdown Content
   */
  constructor(mdContent?: string) {
    this._content = mdContent;
  }

  /**
   * Load a markdown file from path.
   * @param path Path of the source file to load
   * @returns
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

  public get rawContent(): string | undefined {
    return this._content;
  }
}
