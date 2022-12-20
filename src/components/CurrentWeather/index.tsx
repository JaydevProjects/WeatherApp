import React from "react";
import moment from "moment";
import Col from "react-bootstrap/Col";

interface Props {
  data: { weather: any[]; main: { temp: number }; locationName: string };
}

export const CurrentWeather: React.FC<Props> = React.memo(({ data }: Props) => {
  const { weather = [], main, locationName = "" } = data;

  return (
    <>
      {!!weather?.length && (
        <Col
          md={12}
          className="px-0"
        >
          <h3>{moment().format("dddd")}</h3>
          <h6 className="text-muted">{moment().format("Do MMM, YYYY")}</h6>
          <h6 className="text-muted">{locationName}</h6>
          <img
            alt="Not Found"
            src={`https://openweathermap.org/img/w/${weather[0]?.icon}.png`}
          />
          <h3>{Math.round(main?.temp)} &#8451;</h3>
          <h6 className="text-capitalize text-muted">{weather[0]?.description}</h6>
        </Col>
      )}
    </>
  );
});
