export function playSound(soundName) {
  const sound = document.getElementById(soundName);
  if (sound) {
    sound.load();
    sound.play();
  }
}
