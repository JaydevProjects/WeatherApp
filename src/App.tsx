import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
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

  //Get current location (latitude and longitude) from browser
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

  //Get current weather data along with hourly data from latitude & longitude
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
      const convertedName = `${location?.name || ""}`;
      setLocationName(convertedName);
    }
    setLoading(false);
  };

  //Get latitude and longitude according to selected location
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
    <div
      className="w-100 h-100 bg-image overflow-auto"
      style={{
        backgroundImage: `url(${weatherIcon})`,
      }}
    >
      <Container className="h-100">
        {error && (
          <Alert className="mb-0 mt-2" variant="danger">
            An error occured or search results not found. Please try again.
          </Alert>
        )}
        <div className="w-100 h-100">
          {!loading ? (
            <>
              <Row className="mt-4 mx-0">
                <Col md={12} className="px-0">
                  <Autocomplete
                    onPlaceSelected={(place) => {
                      getData(place?.description);
                    }}
                  />
                </Col>
              </Row>
              {!error && (
                <>
                  <div className="mt-4 w-100">
                    <CurrentWeather
                      data={{ ...currentData, locationName: locationName }}
                    />
                  </div>
                  <Row className="mt-4 glass border justify-content-evenly align-items-center mx-0">
                    <h5 className="text-muted mt-2 ms-3">Extended Forecast</h5>
                    {hourlyData?.map((val: any, index: number) => (
                      <HourlyWeather
                        key={`hourly-data-${index}`}
                        data={val}
                      />
                    ))}
                  </Row>
                </>
              )}
            </>
          ) : (
            <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
              <Spinner className="spinner-loading" />
              <h5 className="mt-2">Loading...</h5>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
