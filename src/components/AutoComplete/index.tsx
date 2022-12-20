import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { GLOBALS } from "../../constants";

interface Props {
  onPlaceSelected: (place: any) => void;
}

export const Autocomplete: React.FC<Props> = React.memo(
  ({ onPlaceSelected }: Props) => {
    const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
      useGoogle({
        apiKey: GLOBALS.googleApiKey,
      });
    const [value, setValue] = useState<string>("");
    const [selectedPlace, setSelectedPlace] = useState<any>("");
    const [hideMenu, setHideMenu] = useState<boolean>(true);

    const onClickAddress = async (val: any) => {
      setSelectedPlace(val);
      onPlaceSelected(val);
      setValue(val?.description);
      setHideMenu(true);
    };

    const onChangeAddress = async (
      evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const value = evt?.target?.value || "";
      getPlacePredictions({ input: value });
      setValue(value);
      setHideMenu(false);
    };

    return (
      <div className="position-relative">
        <Form.Control
          type="text"
          id="location-input"
          value={value}
          placeholder="Enter location here..."
          onChange={onChangeAddress}
          onFocus={() => {
            setHideMenu(false);
          }}
          onBlur={() => {
            setHideMenu(true);
          }}
        />
        {!isPlacePredictionsLoading && !hideMenu && (
          <ListGroup className="suggestions-list">
            {placePredictions?.map((val: any, index: Number) => {
              return (
                <ListGroup.Item
                  key={`location-option-${index}`}
                  action
                  onMouseDown={() => onClickAddress(val)}
                  active={val?.description === selectedPlace?.description}
                >
                  {val.description}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </div>
    );
  }
);
