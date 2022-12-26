import React from "react";
import moment from "moment";
import Col from "react-bootstrap/Col";

interface Props {
  data: {
    weather: any[];
    dt: number;
    main: { temp: number };
  };
}

/**
 * This is a HourlyWeather component that takes only one prop named data
 */
export const HourlyWeather: React.FC<Props> = React.memo(({ data }: Props) => {
  const { weather = [], dt, main } = data;

  return (
    <>
      {!!weather?.length && (
        <Col md={1} sm={12} xs={12}>
          <div
            className={`w-100 py-4 d-flex flex-column justify-content-center align-items-center`}
          >
            <h6 className="font-color-light-blue m-0">{`${moment(
              dt * 1000
            ).format("HH")}:00`}</h6>
            <img
              alt="Not Found"
              src={`https://openweathermap.org/img/w/${weather[0]?.icon}.png`}
              height="80px"
            />
            <h6 className="font-color-light-gray m-0">
              {Math.round(main?.temp)}&#8451;
            </h6>
          </div>
        </Col>
      )}
    </>
  );
});
