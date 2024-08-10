const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");

const outputDate = () => {
  let currentDate = new Date();
  let date = currentDate.toLocaleDateString();
  let time = currentDate.toLocaleTimeString();
  let currentDateTime = date + " " + time;
  tarih.textContent = currentDateTime;
};
setInterval(outputDate, 1000);

setTimeout(() => {
  loadingDiv.style.display = "none";
  containerDiv.classList.remove("d-none");
  containerDiv.classList.add("d-flex");
  dataPull();
}, 3000);

btn.onclick = () => dataPull();

const dataPull = () => {
  const random = Math.floor(Math.random() * 15) + 1;
  fetch(
    `https://api.pexels.com/v1/search/?page=${random}&per_page=10&query=black`,
    {
      headers: {
        Authorization:
          "PKbnlCMe0b7THibeNloocxEel03HyNcKZZrYAvHGnb2ZozOiuMdQ4xx1",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("");
      }
      return res.json();
    })
    .then((data) => {
      showImage(data);
    })
    .catch((err) => {
      cardDiv.innerHTML = `<img src="./error.gif"/>`;
    });
};

function showImage({ photos }) {
  cardDiv.innerHTML = "";
  photos.forEach(({ src, photographer }) => {
    cardDiv.innerHTML += `
            <div class="card col-12 col-sm-6 col-lg-4"style="height: 350px">
                <div style="height: 250px;" class="mb-3">
                    <img src="${src.large}" class="card-img-top img">
                </div>
                <div class="card-body text-center" style="height: 50px;">
                    <p class="card-text">Credit:</p>
                    <p class="text-danger fw-light">${photographer}</p>
                </div>
            </div>
        `;
  });
}
