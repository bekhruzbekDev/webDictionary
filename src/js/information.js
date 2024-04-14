const search = document.querySelector("#search"),
  searchBtn = document.querySelector("#search-btn");
innerContainer = document.querySelector(".info-container");
load = document.querySelector(".load");
errorContainer = document.querySelector(".errorContainer");
//search
function searchInfo(e) {
  let value = e.target.value;
  let regex = /[a-zA-z]/;
  if (regex.test(value)) {
    information(value);
    document.querySelector(".input").classList.remove("inputError");
  } else {
    document.querySelector(".input").classList.add("inputError");
  }
}
search.addEventListener("blur", searchInfo);

function info(data) {
  let nounText = ``;
  let verbText = ``;
  let synonyms = "";
  const { word, phonetics, meanings, partOfSpeech, sourceUrls } = data[0];
  meanings[0].definitions.forEach((item) => {
    nounText += `
  <li>
  ${item.definition}
</li>
  `;
  });
  if (meanings[1]) {
    meanings[1].definitions.forEach((item) => {
      verbText += `
      <li>
      ${item.definition}
      <h5>${item.example ?? ""}</h5>
    </li>
      `;
    });
  }
  meanings[0].synonyms.forEach((item) => {
    synonyms += `
  ${item}
  `;
  });

  innerContainer.innerHTML = `
  <div class="title">
  <div class="text">
    <h2>${word}</h2>
    <p>${phonetics[0].text ?? phonetics[1].text}</p>
  </div>
  <img src="./src/img/mp3-icon.svg" alt="" id='music'/>
  <audio src="" autoplay id="audio"></audio>
  </div>
  <div class="noun">
  <div class="noun-title">
    <h3>${meanings[0].partOfSpeech}</h3>
    <div class="span"></div>
  </div>
  <div class="meaning">
    <h4>Meaning</h4>
    <ul class="list">
${nounText}  
    </ul>
    <h4>Synonyms <span>${synonyms}</span></h4>
  </div>
  </div>
  <div class="noun">
  <div class="noun-title">
    <h3>verb</h3>
    <div class="span"></div>
  </div>
  <div class="meaning">
    <h4>Meaning</h4>
    <ul class="list">
    ${verbText}
    </ul>
  </div>
  </div>
  <hr style="margin-bottom: 20px" />
  <div class="footer">
  <p class="source">Source</p>
  <a href="${
    sourceUrls[0]
  }" target="_blank">https://en.wiktionary.org/wiki/keyboard</a>
  <img src="./src/img/tabler.svg" alt="" />
  </div>
  </div>

  <div class="container errorContainer hade">
  <img src="./src/img/errorImg.png" alt="" />
  <h1>No Definitions Found</h1>
  <p>
  Sorry pal, we couldn't find definitions for the word you were looking
  for. You can try the search again at later time or head to the web
  instead.
  </p>
  </div>
  `;
  const music = document.querySelector("#music"),
    audio = document.querySelector("#audio");
  music.addEventListener("click", () => {
    music.addEventListener("click", () => {
      if (data[0].phonetics[0].audio != "") {
        audio.src = `${data[0].phonetics[0].audio}`;
      }
      if (data[0].phonetics[1]) {
        audio.src = `${data[0].phonetics[1].audio}`;
      }
      if (data[0].phonetics[2]) {
        audio.src = `${data[0].phonetics[2].audio}`;
      }
      if (data[0].phonetics[2].audio == "") {
        audio.src = `${data[0].phonetics[1].audio}`;
      }
    });
  });
}

async function information(text) {
  load.style.display = "flex";

  try {
    const req = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
    );
    const data = await req.json();
    if (req.status >= 400) {
      errorContainer.classList.remove("hade");
      innerContainer.style = "display:none";
    } else {
      errorContainer.classList.add("hade");
      innerContainer.style = "display:block";
      info(data);
    }
  } catch (error) {
    errorContainer.classList.remove("hade");
    innerContainer.style = "display:none";
    console.error(error);
  } finally {
    load.classList.add("hade");
  }
}
