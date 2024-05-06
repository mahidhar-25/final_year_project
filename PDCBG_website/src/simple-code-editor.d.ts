declare module 'simple-code-editor' {
  class CodeEditor {
    constructor(options: {
      element?: HTMLElement;
      language?: string;
      lineNumbers?: boolean;
    });
    setCode(code: string): void;
  }
  export default CodeEditor;
}
