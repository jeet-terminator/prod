import { RouteConfig } from "@lit-labs/router";
import { LitElement, TemplateResult } from 'lit';
declare class Router extends LitElement {
    private _routes;
    config: RouteConfig[];
    header: (x: Router) => TemplateResult<any>;
    footer: (x: Router) => TemplateResult<any>;
    constructor();
    goto(): void;
    createRenderRoot(): this;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'lithium-router': Router;
    }
}
export {};
