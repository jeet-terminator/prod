import { html } from '@lithium-framework/core-dom';
import { useStyle } from '@lithium-framework/core-dom/directives';

export function Sprite( props:{src:string , cover?:boolean , zIndex?:number} ){
  
  return html`<div style = ${useStyle({ backgroundImage : `url(${props.src})` , backgroundRepeat : 'no-repeat' , backgroundPosition : 'center' , backgroundSize : props.cover ? 'cover' : 'contain' , gridColumn : 1 , gridRow : 1 , zIndex : props.zIndex || 1 })} ></div>`;

}