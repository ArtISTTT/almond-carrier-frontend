import { Dayjs } from 'dayjs';
import React from 'react';

export const useDifferenceTime = (currentDate: Dayjs) => {
    return React.useCallback(
        (currentT: Dayjs, createdD: Dayjs) => {
            return createdD.from(currentT);
        },
        [currentDate]
    );
};
