async function loadWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderForecast(data.daily);
  } catch (err) {
    document.getElementById('forecast').textContent = 'Failed to load weather.';
  }
}

function getIcon(code) {
  if (code === 0) return '☀️';
  if (code === 1 || code === 2) return '⛅';
  return '☁️';
}

function renderForecast(daily) {
  const container = document.getElementById('forecast');
  const wrapper = document.createElement('div');
  wrapper.className = 'forecast-cards';
  for (let i = 0; i < daily.time.length; i++) {
    const date = new Date(daily.time[i]);
    const day = date.toLocaleDateString(undefined, {
      weekday: 'short', month: 'short', day: 'numeric'
    });
    const card = document.createElement('div');
    card.className = 'day-card';
    card.innerHTML = `
      <div class="icon">${getIcon(daily.weathercode[i])}</div>
      <div class="day">${day}</div>
      <div class="temp">${daily.temperature_2m_min[i]}° / ${daily.temperature_2m_max[i]}°</div>
    `;
    wrapper.appendChild(card);
  }
  container.innerHTML = '';
  container.appendChild(wrapper);
}
