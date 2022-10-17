import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ImageService {

  constructor(private http:HttpClient) { }

  public uploadImage(image: File,imagName:string): Observable<any> {
    const formData = new FormData();

    formData.append('image', image);

    console.log(formData);
    
    return this.http.post('http://localhost:3000/logo/', formData);
  }
}
