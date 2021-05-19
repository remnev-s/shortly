let burgerBtn = document.querySelector(".burger-menu");
let openMenu = document.querySelector(".header-navigation");

burgerBtn.addEventListener("click", function () {
  console.log("work");
  burgerBtn.classList.toggle("active");
  openMenu.classList.toggle("active");
});
