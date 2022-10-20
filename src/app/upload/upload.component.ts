import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public base64String: any = "";
  public imagePath: any;

  constructor(private _sanitizer: DomSanitizer) { }
  ngOnInit(): void {

  }
  imageUploaded(event: any) {
    var imagefile = event.target.files[0];
    // console.log(imagefile);

    var reader = new FileReader();

    reader.onload = () => {
      this.base64String = String(reader.result).replace("data:", "")
        .replace(/^.+,/, "");
        this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.base64String);
    }
    reader.readAsDataURL(imagefile);
  }

  displayString() {
    console.log("Base64String about to be printed");
    alert(this.base64String)
  }
}
