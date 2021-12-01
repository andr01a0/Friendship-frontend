console.log("script init");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  // Make sure the form is not submitted
  event.preventDefault();
  // endpoint for logging in
  const apiUrl = "http://localhost:8080/api/authenticate/login";
  let uname = document.querySelector("#uname").value;
  console.log(uname);
  let psw = document.querySelector("#psw").value;
  console.log(psw);
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      username: uname,
      password: psw,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.token) {
        // Saving the JWT to local storage
        localStorage.setItem("user", JSON.stringify(response.token));
        location.href = "index.html";
      }
    });
});
