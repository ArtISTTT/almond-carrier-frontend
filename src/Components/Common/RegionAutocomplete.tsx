import { TextField, TextFieldProps } from '@mui/material';
import React, { useState } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';

type IProps = {
    textFieldProps: TextFieldProps;
    setValue: (id: any, value: string, placeId: string) => void;
};

const RegionAutocomplete: React.FC<IProps> = ({ textFieldProps, setValue }) => {
    const setValueLocal = (value: any) => {
        setValue(textFieldProps.id, value.formatted_address, value.place_id);
    };

    const { ref } = usePlacesWidget({
        apiKey: 'AIzaSyDTDQ8q7QaBnBfDNHzYTAe7eNt34l-bUis',
        onPlaceSelected: setValueLocal,
        inputAutocompleteValue: textFieldProps.id,
        options: {
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
