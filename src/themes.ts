export interface ThemeArgs {
  headings: string;
  code: string;
  background: string;
  margins: number;
}

export const DefaultThemes = {
  dark: { headings: "white", code: "yellow", background: "#333", margins: 24 },
  light: {
    headings: "#333",
    code: "#686468",
    background: "white",
    margins: 24,
  },
};

export type ThemeMode = keyof typeof DefaultThemes;

/**
 * Theme Container that will allow for various operations throughout the class
 */
export class Theme {
  private _config: Partial<ThemeArgs>;
  private _themeMode: ThemeMode;

  /**
   * Base Themes for PrettyMarkdown
   * @param theme Default Theme to use
   * @param config Override configuration for the theme
   */
  constructor(theme: ThemeMode = "dark", config?: Partial<ThemeArgs>) {
    this._config = { ...DefaultThemes[theme], ...(config || {}) };
    this._themeMode = theme;
  }

  public get config(): Partial<ThemeArgs> {
    return this._config;
  }

  public get themeMode(): ThemeMode {
    return this._themeMode;
  }
}
