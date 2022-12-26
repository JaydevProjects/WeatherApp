import axios from "axios";
import moment from "moment";
import { GLOBALS } from "./constants";

//Function to call GET APIs 
export const GET = (url: string, options?: any) => {
  return axios.get(url, options);
};

//Get hourly data from latitude and longitude from weather API
export const getHourlyWeatherData = async (latLng: {
  lat: number;
  lng: number;
}) => {
  try {
    const response: any = await GET(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latLng?.lat}&lon=${latLng?.lng}&units=metric&cnt=7&appid=${GLOBALS.weatherApiKey}`
    );
    const list = response?.data?.list || [];
    const sortedList: any = list?.sort((a: any, b: any) => {
      return moment.utc(a?.dt*1000).diff(moment.utc(a?.dt*1000));
    });
    return sortedList;
  } catch {
    return 0;
  }
};

//Get current weather data from latitude and longitude from weather API
export const getCurrentWeatherData = async (latLng: {
  lat: number;
  lng: number;
}) => {
  try {
    const response: any = await GET(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latLng?.lat}&lon=${latLng?.lng}&units=metric&appid=${GLOBALS.weatherApiKey}`
    );
    return response?.data || 0;
  } catch {
    return 0;
  }
};

//Get latitude and longitude from location from weather API
export const getLatLng = async (location: string) => {
  try {
    const response: any = await GET(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${GLOBALS.weatherApiKey}`
    );
    if (response?.data?.length) {
      return {
        lat: response?.data[0]?.lat,
        lng: response?.data[0]?.lon,
      };
    }
    return 0;
  } catch {
    return 0;
  }
};

//Get location from latitude and longitude from weather API
export const getLocationFromLatLng = async (latLng: {
  lat: number;
  lng: number;
}) => {
  try {
    const response: any = await GET(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latLng?.lat}&lon=${latLng?.lng}&appid=${GLOBALS.weatherApiKey}`
    );
    if (response?.data?.length) {
      return response?.data?.[0] || [];
    }
    return 0;
  } catch {
    return 0;
  }
};
