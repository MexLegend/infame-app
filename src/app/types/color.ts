export type Color = {
    createdAt?: Date;
    id?: string;
    name: string;
    color: string;
    products?: string[];
    storeId: string;
    updatedAt?: Date;
}

export type ColorFilter = {
    key: string;
    value: string;
}
