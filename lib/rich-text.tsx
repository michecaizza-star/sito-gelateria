import { Fragment, type ReactNode } from "react";

/**
 * Parser minimale per **grassetto** e *corsivo* dentro un paragrafo di testo,
 * usato per i racconti dei prodotti (story/process) senza dover passare a
 * dangerouslySetInnerHTML.
 */
export function renderInlineMarkdown(text: string): ReactNode {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);

  return tokens.map((token, i) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-notte">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("*") && token.endsWith("*")) {
      return <em key={i}>{token.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{token}</Fragment>;
  });
}
