import React from "react";
import moment from "moment";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";

interface Props {
  data: {
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
    locationName: string;
  };
}

/**
 * This is a CurrentWeather component that takes only one prop named data
 */
export const CurrentWeather: React.FC<Props> = React.memo(({ data }: Props) => {
  const { main, locationName = "" } = data;

  return (
    <Row className="glass border mx-0">
          <h5 className="text-muted mb-4 mt-2 ms-2">Current Weather</h5>
          <Col md={4} className="border-end mb-4">
            <div className="d-flex h-100 flex-column justify-content-center align-items-center">
              <h5 className="m-0 font-color-light-gray">
                Today
              </h5>
              <h2 className="font-size-3rem fw-light mb-0 font-color-light-blue">
                {moment().format("Do MMM")}
              </h2>
            </div>
          </Col>
          <Col md={4} className="border-end mb-4">
            <div className="d-flex h-100 flex-column justify-content-center align-items-center">
              <h5 className="font-color-light-gray m-0">{locationName}</h5>
              <h2 className="font-size-3rem fw-light font-color-light-blue m-0">
                {Math.round(main?.temp)}&#8451;
              </h2>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="d-flex h-100 flex-column justify-content-center align-items-center">
              <div className="d-flex justify-content-start align-items-center">
                <h6 className="font-color-light-gray label-width">
                  Feels like
                </h6>
                <h6 className="font-color-light-blue label-width">
                  {Math.round(main?.feels_like)}&#8451;
                </h6>
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <h6 className="font-color-light-gray label-width">Humidity</h6>
                <h6 className="font-color-light-blue label-width">
                  {Math.round(main?.humidity)}%
                </h6>
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <h6 className="font-color-light-gray label-width">Wind</h6>
                <h6 className="font-color-light-blue label-width">
                  {Math.round(data?.wind?.speed)}kph
                </h6>
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <h6 className="font-color-light-gray m-0 label-width">Pressure</h6>
                <h6 className="font-color-light-blue m-0 label-width">
                  {Math.round(main?.pressure)}hPa
                </h6>
              </div>
            </div>
          </Col>
        </Row>
  );
});
