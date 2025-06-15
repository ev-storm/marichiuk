let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");
const tip = document.querySelector(".tip");
const slideIcon = document.querySelector(".slider");
const logo = document.querySelector(".logo");
const fav = document.querySelector(".fav");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
  tip.textContent = "Тёмный режим акивирован";
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
  tip.textContent = "Светлый режим акивирован";
};

if (darkmode === "active") {
  enableDarkmode();
  slideIcon.classList.add("active");
  logo.src = "./assets/svg/logo-2.svg";
  fav.href = "./assets/svg/fav-dark.ico";
} else {
  disableDarkmode();
  slideIcon.classList.remove("active");
  logo.src = "./assets/svg/logo.svg";
  fav.href = "./assets/svg/fav-light.ico";
}

let timeoutId;

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  if (darkmode !== "active") {
    enableDarkmode();
    slideIcon.classList.add("active");
    logo.src = "./assets/svg/logo-2.svg";
    fav.href = "./assets/svg/fav-dark.ico";
  } else {
    disableDarkmode();
    slideIcon.classList.remove("active");
    logo.src = "./assets/svg/logo.svg";
    fav.href = "./assets/svg/fav-light.ico";
  }

  tip.classList.add("active");
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    tip.classList.remove("active");
  }, 2000);
});
