http = new Http();

function handleSubmit() {
  event.preventDefault();

  const urlInputField = document.getElementById("url");
  const url = urlInputField.value;
  removeError(urlInputField);

  if (!isUrlValid(url) || isEmpty(url)) {
    displayError(urlInputField);
    return;
  }

  const endpoint = "https://rel.ink/api/links/";
  const body = {
    url: url,
  };

  http.postData(endpoint, body).then((data) => {
    displayLink(data);
    saveLink(data);
    removeUrl();
  });
}

function isEmpty(url) {
  return url === "";
}

function displayError(urlInputField) {
  urlInputField.classList.add("error");
  const messageSpan = document.querySelector(".errorMessage");
  messageSpan.textContent = "Please add a valid link!";
}

function removeError(urlInputField) {
  urlInputField.classList.remove("error");
  const messageSpan = document.querySelector(".errorMessage");
  messageSpan.textContent = "";
}

function isUrlValid(url) {
  var pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  if (pattern.test(url)) {
    return true;
  } else {
    return false;
  }
}

function displayLink(data) {
  const container = document.querySelector("#shortened-links");
  const resp = shortenedLinkDiv(data);

  container.innerHTML += resp;
}

function shortenedLinkDiv(linkObject) {
  return `
    <div class="shortened-link">
      <div class="shortened-link__item shortened-link__original">${linkObject.url}</div>
      <div class="shortened-link__item shortened-link__copy">
        <span class="shortened-link__text">https://rel.ink/${linkObject.hashid}</span>
        <button class="btn btn--copy">Copy</button>
      </div>
    </div>
    `;
}

function loadLinks() {
  let links = localStorage.getItem("links");
  if (links === null) {
    links = [];
  } else {
    links = JSON.parse(links);
  }

  links.forEach((link) => {
    displayLink(link);
  });
}

function saveLink(link) {
  let links = JSON.parse(localStorage.getItem("links")) || [];
  links.push(link);

  localStorage.setItem("links", JSON.stringify(links));
}

loadLinks();

function removeLinks() {
  const container = document.querySelector("#shortened-links");
  container.innerHTML = "";
  localStorage.removeItem("links");
}

function removeUrl() {
  const urlField = document.querySelector("#url");
  urlField.value = "";
}
