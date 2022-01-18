import renderHeader from "../../fragments/header/header.js"

export default async () => {
  renderHeader("nav-home");
  const main = document.querySelector(".main");

  const mainPageResponse = await fetch("./fragments/main/main.html");
  const mainHtml = await mainPageResponse.text();

  main.innerHTML = mainHtml;

  function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    const formData = new FormData(e.target);

    const friendshipRequest = {
      "request": `Add ${formData.get("username")} ${window.apiUrl} ${formData.get("friendUsername")} ${formData.get("friendHost")} 1\r\n`
    };

    fetch(`${window.apiUrl}/friendship`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(friendshipRequest)
    }).then(response => response.json()).then(response => {
      alert(response.response);
      document.location.reload();
    }).catch(error => {
      alert(error);
    });
  }

  const form = document.querySelector('form');
  form.addEventListener("submit", processForm);

};