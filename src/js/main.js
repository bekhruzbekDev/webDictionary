const darkBtn = document.querySelector(".btn"),
moon = document.querySelector('#moon'),
btnItem =document.querySelector('#circle'),
fontText = document.querySelector('.font-text'),
fontContainer = document.querySelector('.fonts-active'),
fonts = document.querySelectorAll(".font")
//darkMode

function darkMode(){
  document.body.classList.toggle('darkMode')
btnItem.classList.toggle('btn-active')

}

// localStorage.clear()
moon.addEventListener('click',darkMode)
darkBtn.addEventListener('click',darkMode)

// fonts 
function fontActive(){
    fontContainer.classList.toggle("hade")
}
fontText.addEventListener('click',fontActive)

function font(e) {
    let value = e.target.textContent;
    if (value == "Sans Serif") {
      document.body.classList.remove("mono");
      document.body.classList.remove("serif");
      fontText.textContent = value;
      fontActive()
    }
    if (value == "Serif") {
      document.body.classList.add("serif");
      document.body.classList.remove("mono");
      fontText.textContent = value;
      fontText.textContent = value;
      fontActive()
    }
    if (value == "Mono") {
      document.body.classList.remove("serif");
      document.body.classList.add("mono");
      fontText.textContent = value;
      fontText.textContent = value;
      fontActive()
    }
  }
  fonts.forEach((item) => {
    item.addEventListener("click", font);
  });

