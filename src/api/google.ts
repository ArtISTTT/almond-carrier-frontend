import axios from 'axios';
import { Language } from 'src/interfaces/settings';

export const getGooglePlaceDetails = (
    placeID: string,
    language: Language
): Promise<any> =>
    axios
        .get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&key=AIzaSyDTDQ8q7QaBnBfDNHzYTAe7eNt34l-bUis`,
            { withCredentials: true }
        )
        .then(data => {
            console.log(data);
            return '';
        })
        .catch(data => {
            console.log(data);
        });
