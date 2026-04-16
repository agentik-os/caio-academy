/**
 * Remark plugin that transforms ```mermaid code blocks into
 * <MermaidDiagram chart="..." /> MDX elements.
 *
 * This runs BEFORE rehype-pretty-code, so mermaid blocks never
 * get syntax-highlighted (and never trigger a shiki "unknown lang" error).
 */
export function remarkMermaid() {
  return (tree: any) => {
    (function walk(node: any) {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === "code" && child.lang === "mermaid") {
          node.children[i] = {
            type: "mdxJsxFlowElement",
            name: "MermaidDiagram",
            attributes: [
              {
                type: "mdxJsxAttribute",
                name: "chart",
                value: child.value,
              },
            ],
            children: [],
          };
        } else {
          walk(child);
        }
      }
    })(tree);
  };
}
