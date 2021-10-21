// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
   // TODO
  const jsConfetti = new JSConfetti()
  let imgType = ''
  let volNum = '50'
  const selectElement = document.getElementById('horn-select');
  
  selectElement.addEventListener('change', (event) => {
    imgType = event.target.value;
    let res = document.querySelectorAll('img')[0]
    console.log(event.target.value);
    if (event.target.value  == 'car-horn') {  
      res.setAttribute("src", "assets/images/car-horn.svg");
    } else if (event.target.value  == 'air-horn') { 
      res.setAttribute("src", "assets/images/air-horn.svg");
    } else if (event.target.value  == 'party-horn') { 
      res.setAttribute("src", "assets/images/party-horn.svg");
    }
  });

  const selectVol = document.getElementById('volume');
    selectVol.addEventListener('change', (event) => {
    volNum = event.target.value;
    let result = document.querySelectorAll('img')[1]

    if (event.target.value == 0) {
      result.setAttribute("src", "assets/icons/volume-level-0.svg")
    } else if (  event.target.value >= 1 && event.target.value <= 32 )  { 
      result.setAttribute("src", "assets/icons/volume-level-1.svg")
    } else if ( event.target.value >= 33 && event.target.value <= 66 )  { 
      result.setAttribute("src", "assets/icons/volume-level-2.svg")
    } else if ( event.target.value >= 67 && event.target.value <= 100 )  { 
      result.setAttribute("src", "assets/icons/volume-level-3.svg")
    }

  });

  const button = document.querySelector('button');

  button.addEventListener('click', event => {

    if (imgType  == 'car-horn') {  
      let audio = new Audio('assets/audio/car-horn.mp3');
      volNum = parseInt(volNum)/100.0
      // console.log(volNum);
      audio.volume = volNum; 
      audio.play();
    } else if (imgType  == 'air-horn') { 
      let audio = new Audio('assets/audio/air-horn.mp3');
      volNum = parseInt(volNum)/100.0
      // console.log(volNum);
      audio.volume = volNum; 
      audio.play();
    } else if (imgType  == 'party-horn') { 
      let audio = new Audio('assets/audio/party-horn.mp3');
      volNum = parseInt(volNum)/100.0
      // console.log(volNum);
      audio.volume = volNum; 
      audio.play();
      jsConfetti.addConfetti()
    }

  });

}