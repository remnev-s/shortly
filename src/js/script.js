let menuBtn = document.querySelector(".menu__btn");
let openMenu = document.querySelector(".header-navigation");

menuBtn.addEventListener("click", function () {
  console.log("work");
  menuBtn.classList.toggle("active");
  openMenu.classList.toggle("active");
});
