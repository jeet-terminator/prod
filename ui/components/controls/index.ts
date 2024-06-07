import { html , render } from "@lithium-framework/core-dom";
import { useStyle , unsafeSVG } from "@lithium-framework/core-dom/directives";
import { button } from "./button";
import expand from '../../ressources/expand.svg'

export function controls(){
  return html`<div name='controls-panel' style=${useStyle({
    display: 'flex',
    justifyContent: 'right',
    backgroundColor: '#f09d6a'
  })}>
  ${button()}
  <div>${unsafeSVG(expand as any)}</div>
  </div>`;
}