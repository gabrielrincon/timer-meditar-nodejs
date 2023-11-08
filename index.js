const googleTTS = require('google-tts-api');
const player = require('play-sound')((opts = {}));

const timer = (minutes) => {
  let remaining = minutes;

  console.log(`Temporizador establecido por ${minutes} minutos.`);
  
  const interval = setInterval(() => {
    remaining--;

    if (remaining === 0) {
      sayTime(remaining, true);
      clearInterval(interval);
    } else {
      sayTime(remaining);
    }
  }, 60000); // 60000 ms == 1 min
};

const sayTime = (minutes, isEnd = false) => {
  const text = isEnd
    ? 'El temporizador ha terminado.' // Texto cuando el temporizador termina
    : `${minutes === 1 ? 'Falta' : 'Faltan'} ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}. Enfócate en no pensar en nada... Blanquea tus pensamientos... Libera tu mente...`; // Texto para los minutos restantes

  // Obtén la URL del audio utilizando googleTTS.getAudioUrl
  const url = googleTTS.getAudioUrl(text, {
    lang: 'es', // Idioma español
    slow: false, // Velocidad normal
    host: 'https://translate.google.com', // Host de Google Translate
  });

  // Reproduce el audio de la URL obtenida
  player.play(url, function (err) {
    if (err) console.error(`No se pudo reproducir el TTS: ${err}`);
    else console.log(text); // Muestra el texto en la consola si se reproduce con éxito
  });
};

// Inicia el temporizador con 15 minutos
timer(15);
sayTime(15);
