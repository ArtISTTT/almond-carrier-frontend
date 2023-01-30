import { IGetUserReturn } from 'src/interfaces/api/user';
import { mainInstance } from './instance';

export const getUser = (requestData: {
    userId: string;
}): Promise<IGetUserReturn> =>
    mainInstance
        .get('/get-user', {
            params: requestData,
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
