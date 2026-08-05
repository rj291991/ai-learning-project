async function getWeather({ city }) {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await response.json();

    return {
        city,
        temperature: data.current_condition[0].temp_C,
        humidity: data.current_condition[0].humidity,
        weather: data.current_condition[0].weatherDesc[0].value,
    };
}

export default getWeather