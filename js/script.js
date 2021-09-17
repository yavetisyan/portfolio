//  chosed menu tag
const link = document.getElementsByClassName("menu__link");

for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", function (e) {
    let aLink = document.querySelector(".active");
    let l = link[i];

    if (aLink !== null) {
      aLink.classList.remove("active");
    }
    l.classList.toggle("active");
  });
}

// about me button scroll
const button = document.querySelector(".header__btn");

button.addEventListener("click", (e) => {
  (e = document.querySelector("#about")),
    e.scrollIntoView({
      behavior: "smooth",
    });
	
		

});

// navbar scroll
let scrolLink = document.querySelectorAll(".menu__link");

scrolLink.forEach((item) => {
  item.addEventListener("click", () => {
    const it = item.getAttribute("data-link");
    const el = document.getElementById(it);

    el.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// button navbar

let navBtn = document.querySelector(".menu__btn");
navBtn.addEventListener("click", function () {
  let nav = document.querySelector("nav");
  nav.classList.toggle("navBar");

});
