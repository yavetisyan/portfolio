let input = document.querySelector(".addList");
let btn = document.querySelector(".add");
let listTitle = document.getElementsByClassName("list__title");

// Add todo list value

input.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    btn.click();
  }
});

btn.addEventListener("click", function () {
  let add = document.querySelector(".addInput");
  let newDiv = document.createElement("li");
  let newP = document.createElement("p");
  let removBtn = document.createElement("span");

  if (input.value !== "") {
    newDiv.className = "list__title";
    newP.className = "list";
    removBtn.className = "icon-cancel-circle";
    add.prepend(newDiv);
    newDiv.prepend(removBtn);
    newDiv.prepend(newP);
    newP.innerText = input.value;
    input.value = "";
  }

  //remove

  let close = document.getElementsByClassName("icon-cancel-circle");
  for (let i = 0; i < close.length; i++) {
    console.log(close[i]);
    close[i].addEventListener("click", function () {
      this.parentElement.remove();
    });

    // search
  }

  // toogle list
  newP.addEventListener("click", function () {
    //let design = (newDiv.style.backgroundColor = "red");
    newP.classList.toggle("list-active");
  });
});

// search value
