import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "img",
  standalone: true
})
export class ImgPipe implements PipeTransform {

  transform(img_url: string | undefined): any {
    if (!img_url) {
      return "https://res.cloudinary.com/devmexsoft/image/upload/v1696220230/SiteImages/default-image_d06tat_zusmp5.png"
    } else {
      return img_url;
    }
  }
}
