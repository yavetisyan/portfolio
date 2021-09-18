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
  let newDiv = document.createElement("div");
  let newLi = document.createElement("li");
  let newP = document.createElement("p");
  let removBtn = document.createElement("span");
  let dataDiv = document.createElement("div");
  let dataList = document.querySelector(".data__list");
  let timeList = document.querySelector(".time__list");
  let span = document.createElement("span");

  if (input.value !== "") {
    newDiv.className = "div__title";
    newLi.className = "list__title";
    newP.className = "list";
    removBtn.className = "icon-cancel-circle";
    add.prepend(newDiv);
    newDiv.prepend(newLi);
    newDiv.append(dataDiv);

    newLi.prepend(removBtn);
    newLi.prepend(newP);
    newP.innerText = input.value;
    dataDiv.classList.add("data");
    dataDiv.innerHTML = getDate();

    //dataDiv.appendChild(document.createElement("span").classList.add(dataList));

    input.value = "";
  }

  //remove

  let close = document.getElementsByClassName("icon-cancel-circle");
  console.log(close);
  for (let i = 0; i < close.length; i++) {
    close[i].addEventListener("click", function () {
      this.parentElement.parentElement.remove();
    });
  }

  // date

  function getDate() {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12.
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newdate = year + "/" + month + "/" + day;

    return `${newdate}  -  ${dateObj.getHours()} : ${dateObj.getMinutes()} : ${dateObj.getSeconds()}`;
  }

  // toogle list
  newP.addEventListener("click", function () {
    //let design = (newDiv.style.backgroundColor = "red");
    newP.classList.toggle("list-active");
  });
});
