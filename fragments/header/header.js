export default async (activeClass) => {
    const header = document.querySelector('.header');

    const headerPageResponse = await fetch('./fragments/header/header.html');
    const headerHtml = await headerPageResponse.text();

    header.innerHTML = headerHtml;

    document.getElementsByClassName(activeClass)[0].classList.add("active");

  };