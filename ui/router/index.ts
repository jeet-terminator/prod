import { Routes , RouteConfig } from "@lit-labs/router";
// import { WebComponent } from "@lithium-framework/core";
import { html } from "@lithium-framework/core-dom";
import { useStyle , unsafeSVG , useEffect } from "@lithium-framework/core-dom/directives";
import { LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { HomeContent } from '../components';
import { Factory } from '../components/factory';
import { Icon } from "../components/icon";

import XIcon from '../ressources/logo X.svg';
import TGIcon from '../ressources/logo TG.svg';
import iconSkip from '../ressources/skip.svg';

@customElement('main-application')
class Application extends LitElement{

  private _routes = new Routes(this, [
    {path: '/', render: () => HomeContent()},
    {path: '/factory', render: () => Factory()},
    {path: '/about', render: () => html`<h1>About</h1>`},
  ]);


  constructor(){
    
    super();

    window.addEventListener('hashchange', () => {
      this.goto();
    });

    this.goto();

  }

  goto(){
    this._routes.goto( window.location.hash.replace('#' , '') || '/' )
  }

  createRenderRoot() {
    return this; // will render the template without shadow DOM
  }


  render() {

    return html`
      <div id="page">
        <header class = "header" style = ${useStyle({ display : 'grid' , padding : '5px 10px' , gap : '10px'})} >
          <div id="icons">
            ${Icon( { svg : TGIcon , mousedown : () => { window.open( "https://t.me/jeeterminatorsol" ) } } )}
            ${Icon( { svg : XIcon , mousedown : () => { window.open( "https://x.com/JEETERMINATOR" ) } } )}
          </div>
          <div style = ${useStyle({ display : 'inline-flex' , gridColumn : 1 , gridRow : 1 , justifyContent : 'center' })}>
            <h1 style = ${useStyle({ padding : 0 , margin : 0 , cursor : "pointer" })} @mousedown=${() => { window.location.hash = '#/' }} >jeeterminator</h1>
          </div>
        </header>
        <main
          style = ${useStyle({ 
            overflow : "hidden",
            backgroundImage : 'url(ressources/Fond.svg)',
            backgroundSize : "cover",
            display : 'grid',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <slot>${this._routes.outlet()}</slot>
        </main>
        <footer>

        </footer>
      </div>
    `;
  }

}