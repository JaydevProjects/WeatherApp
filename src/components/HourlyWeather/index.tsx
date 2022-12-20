import React from "react";
import moment from "moment";
import Col from "react-bootstrap/Col";

interface Props {
  data: { weather: any[]; dt: number; main: { temp: number } };
}

export const HourlyWeather: React.FC<Props> = React.memo(({ data }: Props) => {
  const { weather = [], dt, main } = data;

  return (
    <>
      {!!weather?.length && (
        <Col
          md={1}
          className="d-flex mb-5 flex-column justify-content-center align-items-center"
        >
          <h6>{`${moment(dt * 1000).format("HH")}:00`}</h6>
          <img
            alt="Not Found"
            src={`https://openweathermap.org/img/w/${weather[0]?.icon}.png`}
          />
          <h6>{Math.round(main?.temp || 0)}&#8451;</h6>
        </Col>
      )}
    </>
  );
});
