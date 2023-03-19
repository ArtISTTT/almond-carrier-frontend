import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import { IBounds } from 'src/interfaces/geometry';

type IProps = {
    textFieldProps: TextFieldProps;
    setValue: (
        id: any,
        value: string,
        placeId: string,
        bounds: IBounds
    ) => void;
};

const RegionAutocomplete: React.FC<IProps> = ({ textFieldProps, setValue }) => {
    const setValueLocal = (value: google.maps.places.PlaceResult) => {
        if (value.geometry) {
            setValue(
                textFieldProps.id,
                value.formatted_address,
                value.place_id,
                {
                    northeast: value.geometry.viewport.getNorthEast(),
                    southwest: value.geometry.viewport.getSouthWest(),
                }
            );
        }
    };

    const { ref } = usePlacesWidget({
        apiKey: 'AIzaSyDTDQ8q7QaBnBfDNHzYTAe7eNt34l-bUis',
        onPlaceSelected: setValueLocal,
        inputAutocompleteValue: textFieldProps.id,
        options: {
            fields: [
                'formatted_address',
                'place_id',
                'geometry',
                'address_components',
            ],
            types: [
                'locality',
                'sublocality',
                'country',
                'administrative_area_level_1',
                'administrative_area_level_2',
            ],
        },
    });

    return (
        <>
            <TextField {...textFieldProps} inputRef={ref} />
        </>
    );
};

export default RegionAutocomplete;
