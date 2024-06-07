import { html } from '@lithium-framework/core-dom';
import { useStyle , useState , unsafeSVG , createRef , ref } from '@lithium-framework/core-dom/directives';

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import download from 'downloadjs';

import { Icon } from '../icon';

import GaucheIcon from '../../ressources/Gauche.svg';
import DroiteIcon from '../../ressources/Droite.svg';
import HatIcon from '../../ressources/Icon hat.svg';
import BodyIcon from '../../ressources/Icon body.svg';
import ArmeIcon from '../../ressources/Icon arme.svg';
import ImgIcon from '../../ressources/Icon img.svg';
import RessetIcon from '../../ressources/reset.svg';

import DicesIcon from '../../ressources/Icon dice.svg';
import DownloadIcon from '../../ressources/bxs-download.svg';
import BuyIcon from '../../ressources/Buy.svg';

import * as Heads from './sprites/head';
import * as Hats from './sprites/hats';
import * as Body from './sprites/body';
import * as Armes from './sprites/armes';
import * as Scapes from './sprites/scapes';
import { State, createState } from '@lithium-framework/core/utils';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function Slider(props:{ type : 'hat' | 'body' | 'arme' | 'scape' , state:State<any> }){

  let [ config , setConfig ] = props.state.mutator;

  let assets = {
    hat : HatIcon,
    body : BodyIcon,
    arme : ArmeIcon,
    scape : ImgIcon
  }

  return html`<div style = ${useStyle({ display : 'inline-flex' , gap : '20px' , alignItems : 'center' , justifyContent : 'center' , border : '1px solid lightgray' , padding : '0px 20px' , borderRadius : '10px' , boxShadow : 'inset 2px 2px 6px #d9d9d9, inset -2px -2px 6px #ffffff' })}>
    ${Icon({ svg : GaucheIcon , height : '40px' , mousedown:() => { 

      let minValue = 0;
      let maxValue = config.value[`${props.type}Max`];
      let currentValue = config.value[`${props.type}Id`];

      setConfig({ ...config.value , [`${props.type}Id`] : currentValue == minValue ? maxValue : currentValue - 1 });

    }})}
    <div style = ${useStyle({ display : 'inline-flex' , gap : "10px" })} >
      ${Icon({ svg : assets[props.type] , height : '30px' })}
      <p style = ${useStyle({ fontSize : '10px' , width : '5ch' , color : '#e97f39' , display : 'flex' , alignItems : 'center' })} >${useState( config , (config) => {
        return html`${config[`${props.type}Id`]}/${config[`${props.type}Max`]}`
      } )}</p>
    </div>
    ${Icon({ svg : DroiteIcon , height : '40px' , mousedown:() => { 

      let maxValue = config.value[`${props.type}Max`];
      let currentValue = config.value[`${props.type}Id`];

      setConfig({ ...config.value , [`${props.type}Id`] : currentValue == maxValue ? 0 : currentValue + 1 });
      
    }})}
    ${Icon({ svg : RessetIcon , height : '20px' , mousedown:() => { 
      
      setConfig({ ...config.value , [`${props.type}Id`] : 0 }) 
      
    } })}
  </div>`

}

export function Factory(){

  let [ loading , setLoading ] = createState( null )

  let [ config , setConfig ] = createState({
    scapeId : 0,
    scapeMax : Object.keys(Scapes).length - 1,
    armeId : 0,
    armeMax : Object.keys(Armes).length - 1,
    bodyId : 0,
    bodyMax : Object.keys(Body).length - 1,
    headId : 0,
    headMax : 0,
    hatId : 0,
    hatMax : Object.keys(Hats).length - 1,
  });

  setConfig({
    ...config.value,
    scapeId : getRandomInt( 0 , config.value.scapeMax ),
    armeId : getRandomInt( 0 , config.value.armeMax ),
    bodyId : getRandomInt( 0 , config.value.bodyMax ),
    headId : getRandomInt( 0 , config.value.headMax ),
    hatId : getRandomInt( 0 , config.value.hatMax )
  })

  let container = createRef<HTMLDivElement>()

  return html`<div style = ${useStyle({ display : 'grid' , padding : '2%' , justifyContent : 'center' , alignItems : 'center' })} >
    <div style = ${useStyle({ gridColumn : 1 , gridRow : 1 , zIndex : 2 , justifyContent : 'stretch' , alignItems : 'center' , display : 'grid' , height : '100%' , width : '100%' , borderRadius : '15px' , pointerEvents : 'none' })} >
      ${useState( loading , ( loading ) => {
        if(loading != null) return html`<div style = ${useStyle({ pointerEvents : 'all' , backgroundColor : 'rgba(115,115,115,0.2)' , borderRadius : "15px" , height : '100%' , width : '100%' , display : 'grid' , justifyContent : 'center' , alignItems : 'center' })} >
          <fast-progress-ring></fast-progress-ring>
        </div>`;

        return html``;
      } )}
    </div>
    <div style = ${useStyle({ gridColumn : 1 , gridRow : 1 , zIndex : 1 , backgroundColor : 'white' , display : 'grid', height : '100%' , gridTemplateColumns : '1fr min-content' , borderRadius : "15px" , boxShadow : '0px 0px 10px dimgray' , maxWidth : '1000px' })} >
      <section style = ${useStyle({ display : 'grid' , padding : "10px" , minHeight : '400px' , minWidth : '400px' })} >
        <div style = ${useStyle({ backgroundColor : '#f9ecb4' , display : 'grid' })} ${ref(container)} >
          ${useState( config , ( newConfig ) => {

            return html`
              ${Scapes[`Scape${newConfig.scapeId}`]()}
              ${Armes[`Arme${newConfig.armeId}`]()}
              ${Body[`Body${newConfig.bodyId}`]()}
              ${Heads[`Head${newConfig.headId}`]()}
              ${Hats[`Hat${newConfig.hatId}`]()}
            `;

          } )}
        </div>
      </section>
      <section style = ${useStyle({ display : 'grid' , alignItems : 'center' , padding: "20px" , gridTemplateRows : '1fr min-content' , borderLeft : '1px solid lightgray' , gap : '10px' })} >
        <div style = ${ useStyle({ display : 'inline-flex' , alignContent : 'center' , justifyContent : 'end' , paddingBottom : '10px' , gap : '10px' }) } >
          <div 
            style = ${useStyle({ display : 'flex' , alignItems : 'center' , fill : '#fcbd92' , cursor : 'pointer' })} 
            @mousedown=${() => {

            setLoading(true)

            toJpeg( container.value ).then((image) => {
              download(image , 'my-jeeterminator.jpeg');

              setLoading(null)
            })

            }}
            >
            ${unsafeSVG(DownloadIcon)}
          </div>
          <div 
            @mousedown = ${() => {
              setConfig({
                ...config.value,
                scapeId : getRandomInt( 0 , config.value.scapeMax ),
                armeId : getRandomInt( 0 , config.value.armeMax ),
                bodyId : getRandomInt( 0 , config.value.bodyMax ),
                headId : getRandomInt( 0 , config.value.headMax ),
                hatId : getRandomInt( 0 , config.value.hatMax )
              })
            }}
            style = ${useStyle({ 
              display : 'flex' , 
              justifyContent : 'end' , 
              height : '30px' , 
              aspectRatio : '1/1' , 
              cursor : 'pointer'
            })} >
            ${unsafeSVG(DicesIcon as any)}
          </div>
        </div>
        <div style = ${useStyle({ display : 'grid' , gridAutoRows : 'min-content' , justifyContent : 'center' , gap : "40px" })}>
          ${Slider( { type : 'hat' , state : config } )}
          ${Slider( { type : 'body' , state : config } )}
          ${Slider( { type : 'arme' , state : config } )}
          ${Slider( { type : 'scape' , state : config } )}
        </div>
        <div style = ${ useStyle({ display : 'grid' , alignContent : 'center' , justifyContent : 'center' }) } >
          <div
            style = ${useStyle({ 
              display : 'flex' , 
              alignItems : 'flex-end' , 
              width : '200px',
              cursor : 'pointer'
            })} >
            ${unsafeSVG(BuyIcon as any)}
          </div>
        </div>
      </section>
    </div>
  </div>`

}