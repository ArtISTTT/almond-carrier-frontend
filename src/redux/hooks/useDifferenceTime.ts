import { useTranslation } from 'react-i18next';
import { Dayjs } from 'dayjs';
import React from 'react';

export const useDifferenceTime = (currentDate: Dayjs) => {
    const { t } = useTranslation();

    return React.useCallback(
        (currentT: Dayjs, createdD: Dayjs) => {
            const difference = currentT.diff(createdD, 'm');

            if (difference >= 1440) {
                if (
                    difference < 2880 ||
                    (difference < 15840 && difference >= 17280) ||
                    (difference < 159840 && difference >= 161280)
                ) {
                    return `${currentT.diff(createdD, 'd')} ${t('dayAgo')}`;
                }
                if (
                    (difference % 1440 >= 2 && difference % 1440 <= 4) ||
                    (difference >= 2880 && difference < 7200) ||
                    (difference >= 17280 && difference < 21600)
                ) {
                    return `${currentT.diff(createdD, 'd')} ${t(
                        'twoFourDaysAgo'
                    )}`;
                }
                return `${currentT.diff(createdD, 'd')} ${t('daysAgo')}`;
            } else if (difference >= 60) {
                if (
                    difference < 120 ||
                    (difference >= 1260 && difference < 1320)
                ) {
                    return `${currentT.diff(createdD, 'h')} ${t('hourAgo')}`;
                }
                if (
                    (difference >= 120 && difference < 300) ||
                    (difference >= 1320 && difference < 1440)
                ) {
                    return `${currentT.diff(createdD, 'h')} ${t(
                        'twoFourhoursAgo'
                    )}`;
                }
                return `${currentT.diff(createdD, 'h')} ${t('hoursAgo')}`;
            } else if (difference === 0) {
                return `${currentT.diff(createdD, 'm')} ${t('now')}`;
            } else {
                if (
                    (difference % 10 === 1 && difference !== 11) ||
                    difference === 1
                ) {
                    return `${currentT.diff(createdD, 'm')} ${t(
                        'oneMinuteAgo'
                    )}`;
                }
                if (
                    (2 <= difference % 10 && difference % 10 <= 4) ||
                    (2 <= difference && difference <= 4)
                ) {
                    if (difference >= 12 && difference < 15) {
                        return `${currentT.diff(createdD, 'm')} ${t(
                            'minutesAgo'
                        )}`;
                    }
                    return `${currentT.diff(createdD, 'm')} ${t(
                        'twoFourMinutesAgo'
                    )}`;
                }
                return `${currentT.diff(createdD, 'm')} ${t('minutesAgo')}`;
            }
        },
        [currentDate]
    );
};
