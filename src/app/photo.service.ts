import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  private photosPlaceHolder = 'http://jsonplaceholder.typicode.com/photos';
  private allPhotos:Photo[] = [];

  constructor(private httpClient: HttpClient) { }

  getPhotos(): Observable<Photo[]>{
    return this.httpClient.get<Photo[]>(this.photosPlaceHolder)
    .pipe(
      tap((allPhotos: Photo[]) => {
        this.allPhotos = allPhotos;
      }), 
      catchError(this.handleError('getPhotos', []))
    );
  }

  searchPhotos(term: string): Observable<Photo[]> {
    if(!term.trim()) {
      return of(this.allPhotos);
    }
    return of(this.allPhotos.filter((photo: Photo) => photo.title.includes(term)));
  }  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: actually handling the errors
      console.error(error); 

      return of(result as T);
    };
  }
}