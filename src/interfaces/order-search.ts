export enum OrderSeachType {
    receivers = 'receivers',
    carriers = 'carriers',
}

export enum userRole {
    receiver = 'receiver',
    carrier = 'carrier',
}

export type carriersFilter = {
    fromLocation?: string;
    fromLocation_placeId?: string;
    fromLocationBounds?: string;
    toLocation?: string;
    toLocation_placeId?: string;
    toLocationBounds?: string;
    maxBenefit?: number;
    maxWeight?: number;
};

export type receiversFilter = {
    fromLocation?: string;
    fromLocation_placeId?: string;
    fromLocationBounds?: string;
    toLocation?: string;
    toLocation_placeId?: string;
    toLocationBounds?: string;
    maxPrice?: number;
    minBenefit?: number;
    maxWeight?: number;
};
