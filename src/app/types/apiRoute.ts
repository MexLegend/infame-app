export type ApiMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUBLIC_API_URL";

export type ApiRoute = {
    isPublic: boolean;
    route: string;
    method: ApiMethod;
}