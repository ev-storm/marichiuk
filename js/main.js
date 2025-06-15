const descriptBtn = document.querySelector(".descript-btn");
const descript = document.querySelector(".descript");
const descriptItem = document.querySelectorAll(".descript-item");

descriptBtn.addEventListener("click", () => {
  descriptBtn.classList.toggle("active");
  descript.classList.toggle("active");
});

descriptItem.forEach((i) => {
  i.addEventListener("click", () => {
    i.classList.toggle("active");
  });
});
