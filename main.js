async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch ${url}`);
  }
}

async function setMotd() {
  const blockquote = document.querySelector("#quote");
  const blockquoteAuthor = document.querySelector("#author");
  const localMotd = await fetchData(
    "https://api.quotable.io/random?tags=technology",
  );

  blockquote.innerHTML = localMotd.content;
  blockquoteAuthor.innerHTML = "&mdash; " + localMotd.author;
}

async function setWeather() {
  const wttr = document.querySelector("#wttr");
  const weather = await fetchData("https://wttr.in/?format=j1");

  temp = weather.current_condition[0].temp_C;
  icon = weather.current_condition[0].weatherIconUrl[0].value;
  desc = weather.current_condition[0].weatherDesc[0].value;

  wttr.innerHTML = `${icon} ${temp}°C ${desc}`;
}

setMotd();
setWeather();
