import { Color } from "./color";

export interface Image {
    url: string,
    publicId: string,
    colorId?: string;
    color?: Color;
}