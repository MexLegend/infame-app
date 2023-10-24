import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "img",
  standalone: true
})
export class ImgPipe implements PipeTransform {

  transform(img_url: string | undefined): any {
    if (!img_url) {
      return "https://res.cloudinary.com/devmexsoft/image/upload/v1698168415/SiteImages/not-user_ptqgiv.jpg"
    } else {
      return img_url;
    }
  }
}
