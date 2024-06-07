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


@customElement('lithium-router')
class Router extends LitElement{

  private _routes = new Routes(this, [
    // {path: '/', render: () => popUpWindow()},
    {path: '/factory', render: () => Factory()},
    {path: '/about', render: () => html`<h1>About</h1>`},
  ]);

  config:RouteConfig[];
  header:( x:Router ) => TemplateResult<any>;
  footer:( x:Router ) => TemplateResult<any>;

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
      <div>
        ${this.header( this ) || null}
        <main>
          ${this._routes.outlet() || null}
        </main>
        ${this.footer( this ) || null}
      </div>
    `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'lithium-router': Router;
  }
}

html`<lithium-router 
  .config=${[
    { path : '/' , render : () => html`<h1>Hello World</h1>` }
  ]}
  .header=${( x:Router ) => { return html`<header>Header</header>` }}
  .footer=${( x:Router ) => { return html`<footer>Footer</footer>` }}
/>`

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
      <div
        style = ${useStyle({
          display : 'grid',
          height : '100%',
          width : '100%',
          position : 'fixed',
          gridTemplateRows : 'min-content 1fr',
          top : '0',
          left : '0'
        })}
      >
        <header style = ${useStyle({ display : 'grid' , padding : '5px 10px' , gap : '10px'})} >
          <div style = ${useStyle({ display : 'inline-flex' , gridColumn : 1 , gridRow : 1 , alignItems : 'center' , gap : '10px' })}>
            ${Icon( { svg : TGIcon } )}
            ${Icon( { svg : XIcon } )}
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