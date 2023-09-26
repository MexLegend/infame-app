import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "img",
  standalone: true
})
export class ImgPipe implements PipeTransform {

  transform(img_url: string | undefined): any {
    if (!img_url) {
      return "https://res.cloudinary.com/devmexsoft/image/upload/v1695689308/SiteImages/default-image_d06tat.png"
    } else {
      return img_url;
    }
  }
}
