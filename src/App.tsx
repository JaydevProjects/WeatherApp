import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Autocomplete } from "./components/AutoComplete";
import { CurrentWeather } from "./components/CurrentWeather";
import { HourlyWeather } from "./components/HourlyWeather";
import {
  getCurrentWeatherData,
  getHourlyWeatherData,
  getLatLng,
  getLocationFromLatLng,
} from "./helpers";
import weatherIcon from "./assets/images/weather.svg";
import "./App.css";

export const App = () => {
  const [currentData, setCurrentData] = useState<any>();
  const [hourlyData, setHourlyData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [locationName, setLocationName] = useState<string>("");
  const [error, showError] = useState<boolean>(false);

  useEffect(() => {
    getBrowserPosition();
  }, []);

  const getBrowserPosition = async () => {
    setLoading(true);
    await navigator.geolocation.getCurrentPosition(
      (response: any) => {
        const latLng = {
          lat: response?.coords?.latitude,
          lng: response?.coords?.longitude,
        };
        getWeatherData(latLng, true);
      },
      () => {
        showError(true);
      }
    );
  };

  const getWeatherData = async (
    latLng: { lat: number; lng: number },
    isLocation = false
  ) => {
    showError(false);
    const currentWeatherData = await getCurrentWeatherData(latLng);
    setCurrentData(currentWeatherData || {});
    const hourlyWeatherData = await getHourlyWeatherData(latLng);
    setHourlyData(hourlyWeatherData || []);
    if (!currentWeatherData || !hourlyWeatherData) {
      showError(true);
    }
    if (isLocation) {
      const location = await getLocationFromLatLng(latLng);
      if (!location) {
        showError(true);
      }
      const convertedName = `${location?.name || ""}, ${
        location?.state || ""
      }, ${location?.country || ""}`;
      setLocationName(convertedName);
    }
    setLoading(false);
  };

  const getData = async (selected: string) => {
    setLoading(true);
    setLocationName(selected);
    const latLng: any = await getLatLng(selected);
    if (!latLng) {
      showError(true);
    }
    getWeatherData(latLng || {});
  };

  return (
    <Container>
      {error && (
        <Alert className="mb-0 mt-2" variant="danger">
          An error occured or search results not found. Please try again.
        </Alert>
      )}
      <Row className="w-100 mx-0 mt-2">
        <Row
          className={`px-3 pt-4 mx-0 bg-image border rounded d-flex flex-column ${
            !loading ? "justify-content-start" : "justify-content-center"
          } align-items-center minHeight`}
          style={{ backgroundImage: `url(${weatherIcon})` }}
        >
          {!loading ? (
            <>
              <Autocomplete
                onPlaceSelected={(place) => {
                  getData(place?.description);
                }}
              />
              <Row className="mt-3">
                <CurrentWeather
                  data={{ ...currentData, locationName: locationName }}
                />
              </Row>
              <Row className="mt-3 px-0">
                {hourlyData?.map((val: any, index: number) => (
                  <HourlyWeather key={`hourly-data-${index}`} data={val} />
                ))}
              </Row>
            </>
          ) : (
            <div className="d-flex flex-column justify-content-start align-items-center">
              <Spinner className="spinner-loading" />
              <h5 className="mt-2">Loading...</h5>
            </div>
          )}
        </Row>
      </Row>
    </Container>
  );
}
