export function applyTheme(themeImg) {
  const isLight = localStorage.getItem("lightTheme") === "true";
  document.body.classList.toggle("light-theme", isLight);
  themeImg.src = isLight ? "./Img/dark_theme.png" : "./Img/light_theme.png";
}

export function toggleTheme(themeImg) {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  localStorage.setItem("lightTheme", isLight);
  themeImg.src = isLight ? "./Img/dark_theme.png" : "./Img/light_theme.png";
}
