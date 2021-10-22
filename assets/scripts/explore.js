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
    //get the attribute name from the selected option from the dropdown 
    voiceSelected = event.target.options[event.target.selectedIndex].getAttribute('data-name');
  });

  //Press button related stuff:
  const button = document.querySelector('button');
  button.addEventListener('click', event => {
    let voices = speechSynthesis.getVoices();
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
    
    let res = document.querySelectorAll('img')[0]
    if(textEntered != '') {
      res.setAttribute("src", "assets/images/smiling-open.png");
    }

    speech.onend = function(event) {
    //  console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' seconds.');
      res.setAttribute("src", "assets/images/smiling.png");
    }  

  });

}

//function copied over from MDN's documementation 
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
//do we need to take care of the case when there is not text entered but the user still presses the button