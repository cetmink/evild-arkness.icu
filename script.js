const entry = document.getElementById("entry");
const payload = document.getElementById("payload");
const info = document.getElementById("info");
const music = document.getElementById("music");
const fog = document.getElementById("fog");

let started = false;

// Footer link only
fog.onclick = (e) => {
  e.stopPropagation();
  window.location.href = "https://6fog.lol";
};

// Click anywhere to start
document.body.onclick = async () => {
  if (started) return;
  started = true;

  entry.style.display = "none";
  payload.classList.remove("hidden");
  music.play();

  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();

  setInterval(() => {
    const now = new Date();
    const time = now.toLocaleString("en-GB", {
      hour12: false
    });

    const flag = data.country_code
      ? `https://flagcdn.com/w20/${data.country_code.toLowerCase()}.png`
      : "";

    info.innerHTML = `
       Welcome To Darkness
       ------- TIME -------
      ${time}
      ------- DEVICE & BROWSER -------
     ${navigator.platform} & ${navigator.userAgent.split(") ")[0]})
      ------- IPDATA -------
    IP Address: ${data.ip}
     Country: ${data.country_name} ${flag ? `<img src="${flag}">` : ""}
      Location: ${data.city}, ${data.region}
  Provider: ${data.org}
     ------- LOCATION -------
     Continent: ${data.continent_code}
    Postal Code: ${data.postal}
   Coordinates: ${data.latitude}, ${data.longitude}
    Timezone: ${data.timezone}
      Currency: ${data.currency}
       Language: ${navigator.language}
     ------- SECURITY -------
        Tor: No
      Proxy: No
    ------- END -------
`;
  }, 1000);
};


