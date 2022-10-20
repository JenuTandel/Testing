import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageService } from './image.service';
// class ImageSnippet {
//   pending: boolean = false;
//   status: string = 'init';

//   constructor(public src: string, public file: any) { }
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // public logoform: FormGroup;
  // selectedFile: ImageSnippet;

  // constructor(private imageService: ImageService,
  //   private fb: FormBuilder) {
  //   this.selectedFile = new ImageSnippet('', '');
  //   this.logoform = new FormGroup('');
  // }
  // ngOnInit(): void {
  //   this.logoform = this.fb.group(
  //     {
  //       imageurl:['']
  //     }
  //   )
  // }

  // private onSuccess() {
  //   this.selectedFile.pending = false;
  //   this.selectedFile.status = 'ok';
  // }

  // private onError() {
  //   this.selectedFile.pending = false;
  //   this.selectedFile.status = 'fail';
  //   this.selectedFile.src = '';
  // }

  // processFile(imageInput: any) {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();

  //   reader.addEventListener('load', (event: any) => {

  //     this.selectedFile = new ImageSnippet(event.target.result, file);

  //     this.selectedFile.pending = true;
  //     this.imageService.uploadImage(this.selectedFile.file, this.selectedFile.file.name).subscribe(
  //       (res) => {
  //         this.onSuccess();
  //       },
  //       (err) => {
  //         this.onError();
  //       })
  //   });

  //   reader.readAsDataURL(file);
  // }

  public profileForm: FormGroup;
  public error: string;

  fileUpload = {status: '', message: '', filePath: ''};

  constructor(private fb: FormBuilder, private fileUploadService: ImageService) { 
    this.profileForm = new FormGroup('');
    this.error = "";
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [''],
      profile: ['']
    });
  }

  onSelectedFile(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.controls['profile'].setValue(file);
      // this.profileForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.profileForm.controls['name'].value);
    formData.append('profile', this.profileForm.controls['profile'].value);

    this.fileUploadService.upload(formData).subscribe(
      (      res: { status: string; message: string; filePath: string; }) => this.fileUpload = res,
      (      err: string) => this.error = err
    );
  }

}