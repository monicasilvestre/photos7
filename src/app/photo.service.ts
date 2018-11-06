import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  private photosPlaceHolder = 'http://jsonplaceholder.typicode.com/photos';

  constructor(private httpClient: HttpClient) { }

  getPhotos(): Observable<Photo[]>{
    return this.httpClient.get<Photo[]>(this.photosPlaceHolder)
    .pipe(
      catchError(this.handleError('getPhotos', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: actually handling the errors
      console.error(error); 

      return of(result as T);
    };
  }
}