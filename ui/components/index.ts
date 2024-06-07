import { html , render } from "@lithium-framework/core-dom";
import { useStyle , unsafeSVG, useEffect , createRef , ref } from "@lithium-framework/core-dom/directives";
import { controls } from "./controls";
import { Icon } from "./icon";
import iconBuy from '../ressources/Buy.svg';
import iconFactory from '../ressources/Factory.svg';
import iconSkip from '../ressources/skip.svg';
import videojs from 'video.js';
import popUpWindowCss from './style.module.css'
import videoLecterCss from './style.module.css'
import 'video.js/dist/video-js.css';

export function popUpWindow() {

  const popup_ref = createRef<HTMLDivElement>()

  function onInit(target) {
    
    var player = videojs(target, {
      controls: false, // Désactiver les contrôles ici
      autoplay: true,
    });

    function resizeScreen() {
      let width = window.innerWidth;
      let height = window.innerHeight;
      console.log({"screen_width": width, "screen_height": height});
      player.width(width);
      player.height(height);
      player.fluid(true);
      console.log(player.fluid_);
    }

    player.on('ready', () => {

      function launch(){
        player.play();
        target.removeEventListener( 'mousedown' , launch );
      }

      target.addEventListener('mousedown' , launch);
    });

    // target.addEventListener('click', (event) => {
    //   player.pause();
    //   // player.controls(false);
    //   console.log(player.controls_);
    // });

    target.addEventListener('resize', () => {
      resizeScreen();
    });

  }

  return html`<div name='pop-up-windows' class=${popUpWindowCss} ${ref(popup_ref)}>
    <video ${useEffect(onInit)} id="my-video" class="video-js" preload="auto" data-setup="{}">
      <source src="./ressources/video/blingbling.mp4" type="video/mp4" />
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
      </p>
    </video>
    <div name='btn-zone'>
      <div name='skip-btn'>
        <fast-button appearance="accent" style = ${useStyle({ pointerEvents : 'all' })} @mousedown = ${( event:MouseEvent ) => popup_ref.value?.remove() }>Skip</fast-button>
        <!-- ${Icon({ svg : iconSkip })} -->
      </div>
    </div>
  </div>`;
}

export function HomeContent() {

  return html`<div name='home-content' style=${useStyle({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  })}>
    ${popUpWindow()}
    ${Icon({ svg : iconFactory , height : '100px' , mousedown : () => window.location.hash = '#/factory' , aspectRatio : '2/1' })}
    <div name='content' style=${useStyle({
      backgroundImage : 'url(ressources/Tete.svg)',
      backgroundRepeat: 'no-repeat',
      width: '250px',
      height: '250px'
    })}></div>
    ${Icon({ svg : iconBuy , height : '100px' , aspectRatio : '2/1' })}
  </div>`;
}
