export function playGifAnimation(id, duration, callback) {
  const gif = document.getElementById(id);
  if (!gif) {
    console.error(`GIF dengan ID '${id}' nggak ditemukan.`);
    callback(); // fallback biar tetap jalan
    return;
  }

  gif.style.display = 'block';
  gif.style.opacity = '0';
  gif.src = gif.src;

  // Fade in
  requestAnimationFrame(() => {
    gif.style.opacity = '1';
  });

  // Fade out setelah selesai
  setTimeout(() => {
    gif.style.opacity = '0';
    setTimeout(() => {
      gif.style.display = 'none';
      if (callback) callback();
    }, 500); // fade out duration
  }, duration);
}
