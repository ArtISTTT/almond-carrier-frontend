import axios from 'axios';
import { Language } from 'src/interfaces/settings';

export const getGooglePlaceDetails = (
    placeID: string,
    language: Language
): Promise<string> =>
    axios
        .get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=AIzaSyDTDQ8q7QaBnBfDNHzYTAe7eNt34l-bUis`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )
        .then(data => {
            console.log(data);
            return 'OK';
        })
        .catch(err => {
            console.log(err);

            return 'NOT OK';
        });
