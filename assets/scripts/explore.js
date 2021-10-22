// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  //global vars 
  let voiceSelected;
  let textEntered = '';

  //fill in the dropdown with voices
  populateVoiceList();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
 
  //get text entered by the user 
  let input = document.getElementById('text-to-speak');

  input.addEventListener('change', updateValue);

  function updateValue(e) {
    textEntered = e.target.value;
  } 

  //get which voice is selected: 
  const selectElement = document.getElementById('voice-select');



  selectElement.addEventListener('change', (event) => {
   
    voiceSelected = event.target.options[event.target.selectedIndex].getAttribute('data-name');
  });


  //Press button stuff:
  const button = document.querySelector('button');
  button.addEventListener('click', event => {
   
  let voices = speechSynthesis.getVoices();
  console.log(voices[0].name);
  console.log(voiceSelected);
  let test;
 
  for(let i = 0; i < voices.length ; i++) {
    if(voices[i].name === voiceSelected) {
      test = voices[i];
    }
  }


  let speech = new SpeechSynthesisUtterance();

  speech.lang = "en-US";
  speech.text = textEntered;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;    
  speech.voice = test;            

  window.speechSynthesis.speak(speech);

  let amISpeaking = window.speechSynthesis.speaking;

  console.log(amISpeaking);
  let res = document.querySelectorAll('img')[0]

  // while (amISpeaking == true) { 
  //   res.setAttribute("src", "assets/images/smiling-open.png");
  // } 
  // res.setAttribute("src", "assets/images/smiling.png");
  

  });



}

function populateVoiceList() {
  if(typeof speechSynthesis === 'undefined') {
    return;
  }

  let voices = speechSynthesis.getVoices();

  for(var i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    document.getElementById("voice-select").appendChild(option);
  }
}


//questions about slider in expose section
//why is amISpeaking always true 
//do we need to take care of the case when there is not text entered but the user still presses the button