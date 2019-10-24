import axios from "axios";

const weatherRequest = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5"
});

export const getWeatherByCity = () => {
  return weatherRequest
    .get(`/weather?id=3530597&appid=0a439f9c9eb951ab5f9031fc9d21b251`)
    .then(({ data }) => data);
};
