const synth = window.speechSynthesis;

//DOM Elements
const textForm = document.querySelector('form');
const textInput=document.querySelector('#text-input');
const voiceSelect=document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//Array de voces
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop y crear opcion en el select
  voices.forEach(voice => {
    // Crear opcion
    const option = document.createElement('option');

    // Llenar texto
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Atributos
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);

    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) 
{
  synth.onvoiceschanged = getVoices;
}

//Hablar
const speak= () => {
    

    //Check si hablando
    if(synth.speaking)
    {
        console.error('Hablando');
        return;
    }

    if(textInput.value !=='')
    {
        //Backgroud gif
        body.style.background='#1414 url(img/wave.gif)';
        //body.style.backgroundRepeat= 'repeat-x';
        body.style.backgroundSize='100% 100%';

        //Agarrar el texto
        const speakText= new SpeechSynthesisUtterance(textInput.value);

        //Fin 
        speakText.onend = e => {
            console.log('fin del texto...');
            body.style.background='#141414';
        };

        //Error
        speakText.onerror=e =>{
            console.error('Ocurrio un error...');
        };

        //Selector de voz
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //Loop el array hasta coincidir con la seleccionada
        voices.forEach(voice => {
            if(voice.name == selectedVoice)
            {
                speakText.voice = voice;
            }
        });

        //Set Pitch y Rate
        speakText.rate =rate.value;
        speakText.pitch=pitch.value;

        //Escuchar
        synth.speak(speakText);

    }
};

//Event Listeners

//text-form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//Cambiar valores de rate y pitch 
rate.addEventListener('change', e => (rateValue.textContent=rate.value));
pitch.addEventListener('change', e => (pitchValue.textContent=pitch.value));

//cambio de voz
voiceSelect.addEventListener('change', e => speak());