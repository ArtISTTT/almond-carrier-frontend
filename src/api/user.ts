import { IGetUserReturn } from 'src/interfaces/api/user';
import { mainInstance } from './instance';

const getLanguage = () => localStorage.getItem('language');

export const getUser = (requestData: {
    userId: string;
}): Promise<IGetUserReturn> =>
    mainInstance
        .get('/get-user', {
            params: { ...requestData, language: getLanguage() },
        })
        .then(data => {
            return { ok: true, user: data.data };
        })
        .catch(data => {
            return {
                ok: false,
                error: data.response?.data?.message ?? 'Error',
            };
        });
