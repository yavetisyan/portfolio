let count = 0;

let items = document.querySelectorAll(".items");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let dots = document.getElementsByClassName("dot");
let max = items.length;

function showImage(e) {
  if (e < 0) {
    count = max - 1;
  }
  if (e >= max) {
    count = 0;
  }

  for (let i = 0; i < max; i++) {
    items[i].style.display = "none";
  }

  items[count].style.display = "block";
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
    dots[i].addEventListener("click", function () {
      showImage((count = i));
    });
  }
  dots[count].className += " active";
}
showImage(count);

function nextBtn() {
  count++;
  showImage(count);
}

function prevBtn() {
  count--;
  showImage(count);
}

next.addEventListener("click", nextBtn);
prev.addEventListener("click", prevBtn);

let interval = null;
let playButtons = document.querySelector("#icon");

function startSlide(e) {
  if (playButtons.hasAttribute("class", "icon-play2")) {
    playButtons.classList.toggle("icon-stop");

    if (!interval) {
      interval = setInterval(nextBtn, 2000);
    } else {
      clearInterval(interval);
      interval = null;
    }
  }
}
