import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class ImageService {

  // constructor(private http:HttpClient) { }

  // public uploadImage(image: File,imagName:string): Observable<any> {
  //   const formData = new FormData();

  //   formData.append('image', image);

  //   console.log(formData);

  //   return this.http.post('http://localhost:3000/logo/', formData);
  // }

  apiUrl = 'http://localhost:3000/logo/';

  constructor(private http: HttpClient) { }


  upload(formData:any) {
    return this.http.post<any>(`${this.apiUrl}`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event, formData)),
      catchError(this.handleError)
    );
  }

  private getEventMessage(event: HttpEvent<any>, formData:any) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
        break;
      case HttpEventType.Response:
        return this.apiResponse(event);
        break;
      default:
        return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event:any) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event:any) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened. Please try again later.');
  }

}
