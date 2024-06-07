import { html } from '@lithium-framework/core-dom';
import { useStyle , unsafeSVG } from '@lithium-framework/core-dom/directives';

export function Icon( props:{ svg:string | any , height? : string , mousedown?:(event:MouseEvent) => void , aspectRatio? : string} ){

  return html`<div
    @mousedown=${props.mousedown || null}
    style = ${ useStyle({
      display : 'grid',
      height : props.height || "20px",
      aspectRatio : props.aspectRatio || '1/1',
      alignItems: 'center',
      cursor : 'pointer'
    }) }
  >
    ${unsafeSVG( props.svg )}
  </div>`

}