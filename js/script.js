//  chosed menu tag
const link = document.getElementsByClassName("menu__link");

for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", function (e) {
    let aLink = document.querySelector(".active");
    let l = link[i];
    let scrollLink = l.getAttribute("href");

    if (aLink !== null) {
      aLink.classList.remove("active");
    }
    l.classList.toggle("active");

    e = document.querySelector(scrollLink);

    e.scrollIntoView({
      behavior: "smooth",
    });
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
