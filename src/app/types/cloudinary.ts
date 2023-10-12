export type WidgetContext = {
    alt: string;
}

export type CloudinaryWidgetOptions = {
    cropping?: boolean; //add a cropping step
    showAdvancedOptions?: boolean;  //add advanced options (public_id and tag)
    sources?: string[]; // ["local", "url"], restrict the upload sources to URL and local files
    multiple?: boolean;  //restrict upload to a single file
    folder?: string; //upload files to the specified folder
    tags?: string[]; // ["users", "profile"], add the given tags to the uploaded files
    context?: WidgetContext; //add the given context data to the uploaded files
    clientAllowedFormats?: string[]; // ["images"], //restrict uploading to image files only
    maxImageFileSize?: number; // 2000000,  //restrict file size to less than [2MB]
    maxImageWidth?: number; // 2000 //Scales the image down to a width of [2000] pixels before uploading
}

export type CloudinaryWidgetResponse  = {
    secure_url: string;
    public_id: string;
}