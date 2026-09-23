// Web Audio API Synthesizer for Notifications & Green Cash Register Sounds

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch (e) {
    return null;
  }
}

/**
 * Plays authentic Cash Register / Money sound for Green events
 */
export function playMoneyCoinSound() {
  try {
    // Play professional cash register sound sample from Google Actions sound library
    const audio = new Audio('https://actions.google.com/sounds/v1/cash/cash_register_bing.ogg');
    audio.volume = 0.8;
    audio.play().catch((err) => {
      // Fallback to Web Audio synthesizer if autoplay restricted
      playSyntheticCashRegister();
    });
  } catch (e) {
    playSyntheticCashRegister();
  }
}

/**
 * Fallback Web Audio API Cash Register Synthesizer ("Ka-Ching!")
 */
function playSyntheticCashRegister() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    // Mechanical drawer thud
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.08);
  } catch (e) {}

  // Bell Chime
  try {
    const bell = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bell.type = 'sine';
    bell.frequency.setValueAtTime(1046.50, now + 0.08); // C6
    bell.frequency.setValueAtTime(1318.51, now + 0.14); // E6
    bellGain.gain.setValueAtTime(0.6, now + 0.08);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    bell.connect(bellGain);
    bellGain.connect(ctx.destination);
    bell.start(now + 0.08);
    bell.stop(now + 0.6);
  } catch (e) {}
}

/**
 * Standard Alert Tone for Foguinho or general alerts
 */
export function playFoguinhoAlertSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(587.33, now); // D5
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.35);
}

/**
 * Low Tone for Red / Derrota
 */
export function playRedAlertSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(349.23, now); // F4
  osc.frequency.exponentialRampToValueAtTime(220.00, now + 0.2); // A3

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.35);
}

/**
 * Play appropriate sound based on notification type
 */
export function playNotificationAudioByType(type: string) {
  if (type === 'green' || type === 'bilhete_green' || type === 'progresso' || type === 'bilhete_progresso') {
    playMoneyCoinSound();
  } else if (type === 'foguinho') {
    playFoguinhoAlertSound();
  } else if (type === 'red' || type === 'bilhete_red' || type === 'derrota') {
    playRedAlertSound();
  } else {
    playMoneyCoinSound();
  }
}
