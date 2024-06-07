import WebsiteBackground from "./ressources/Fond.svg";
import { html , render } from "@lithium-framework/core-dom";
import { useStyle , unsafeSVG } from "@lithium-framework/core-dom/directives";
import { popUpWindow } from './components';
import UrlPattern from 'url-pattern';

import { DesignSystem } from "@microsoft/fast-foundation"
import { allComponents } from '@microsoft/fast-components';

DesignSystem.getOrCreate().register( allComponents );

if (!window["URLPattern"]) { window["URLPattern"] = UrlPattern }

import './index.css';
import './router';

render( html`<main-application></main-application>` , document.body );

