import { Dayjs } from 'dayjs';
import React from 'react';

export const useDifferenceTime = (currentDate: Dayjs) => {
    return React.useCallback(
        (createdD: Dayjs) => {
            return createdD.fromNow();
        },
        [currentDate]
    );
};
