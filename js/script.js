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

    //let scrollLink = l.getAttribute("href");
    //e = document.querySelector(scrollLink);

    //e.scrollIntoView({
    //  behavior: "smooth",
    //});
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
