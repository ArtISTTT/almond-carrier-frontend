import { Dayjs } from 'dayjs';
import React from 'react';

export const useCreateQueryParams = (route: string) => {
    return React.useCallback(
        (currentT: Dayjs, createdD: Dayjs) => {
            switch (route) {
                // case value:
                //     break;

                default:
                    break;
            }
        },
        [route]
    );
};
