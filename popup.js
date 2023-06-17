document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.getElementById("url");
  const generateButton = document.getElementById("generate-button");
  const qrCodeContainer = document.getElementById("qr-code-container");
  const qr = document.querySelector(".qr");
  const link = document.querySelector(".link");
  const baseUrl = "https://infoajara.com/api/v1";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const url = input.value;

    qrCodeContainer.classList.add("d-none");
    generateButton.classList.add("disabled");
    generateButton.innerText = "Generating...";

    fetch(`${baseUrl}/generate`, {
      method: "POST",
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: url }),
    })
      .then((response) => response.json())
      .then((data) => {
        qr.innerHTML = `
          <div class="mb-3">
            <img width="200" height="200" src="${data.data}" alt="${data.data}" />
          <div>
        `;
        link.innerHTML = `
          <a href="${data.data}" class="btn btn-success" download>
            Download
          </a>
        `;

        qrCodeContainer.classList.remove("d-none");
        generateButton.classList.remove("disabled");
        generateButton.innerText = "Generate";
      })
      .catch(console.error());
  });
});
