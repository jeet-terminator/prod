import { html , render } from "@lithium-framework/core-dom";
import { useStyle , unsafeSVG } from "@lithium-framework/core-dom/directives";

export function button(){
  return html`<button style=${useStyle({
    border: 'none',
    background: '#f9d98cc4',
    width: '250px',
    height: '50px',
    fontSize: '24px',
    cursor: 'pointer',
    borderRadius: '10px',
    color: '#ffffff'
  })}>
    Skip
  </button>`;
}