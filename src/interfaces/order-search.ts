export enum OrderSeachType {
    receivers = 'receivers',
    carriers = 'carriers',
}

export type carriersFilter = {
    fromLocation?: string;
    toLocation?: string;
    maxBenefit?: number;
    maxWeight?: number;
};

export type receiversFilter = {
    fromLocation?: string;
    toLocation?: string;
    maxPrice?: number;
    minBenefit?: number;
    maxWeight?: number;
};
