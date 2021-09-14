//  chosed menu tag
const link = document.getElementsByClassName("menu__link");

for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", function (e) {
    let aLink = document.querySelector("a.active");
    if (aLink !== null) {
      aLink.classList.remove("active");
    }
    e.target.className = "active";
  });
}

// about me button scroll
const button = document.querySelector(".header__btn");

button.addEventListener("click", () => {
  (about = document.querySelector("#about")),
    about.scrollIntoView({
      behavior: "smooth",
    });
});

const menu = document.getElementsByClassName("menu__link");

for (let i = 0; i < menu.length; i++) {
  menu[i].addEventListener("click", function () {
    const hrefLink = menu[i].getAttributeNames("href");
    let aa = document.querySelector(hrefLink);
    console.log(aa);
    aa.scrollIntoView({
      behavior: "smooth",
    });
  });
}
