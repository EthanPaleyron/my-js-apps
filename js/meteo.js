const main = document.querySelector("main");
const urlCity = (city) => {
  const apiKey = "0eee845fbfb08dcc0204fcb70613dc4a";
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`;

  fetch(url)
    .then((response) =>
      response.json().then((data) => {
        console.log(data);
        document.querySelector(
          "#city"
        ).innerHTML = `<h2 class="city">City: ${data.city.name} ${data.city.country}</h2><br>`;
        let tmp = "";
        for (const day of data.list) {
          const newSplice = day.dt_txt.split(" ");
          if (newSplice[0] !== tmp) {
            tmp = newSplice[0];
            main.innerHTML += `
              <article class="card">
                <time>${newSplice[0]}</time>
                <p>Min : ${day.main.temp_min}°</p>
                <p>Max : ${day.main.temp_max}°</p>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather"> 
              </article>`;
          }
        }
      })
    )
    .catch((error) => console.log("Error : " + error));
};

let searchCity = document.querySelector("#searchCity");
document.querySelector("form").addEventListener("submit", (e) => {
  main.innerHTML = "";
  e.preventDefault();
  urlCity(searchCity.value);
  searchCity.value = "";
});
