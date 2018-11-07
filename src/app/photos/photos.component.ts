import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photos: Photo[];
  photosFromServer: Photo[];
  currentSearch = '';
  numberOfElementsPerPage = 12;
  currentPage = 0;  
  
  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos(): void {
    this.photoService
      .getPhotos()
      .subscribe(photos => {
        this.photosFromServer = this.photos = photos;
        this.paginate(0);
      });
  }

  search(newSearch: string) {
    this.currentSearch = newSearch.trim();
    this.paginate(0);
  }

  paginate(newPage: number): void {
    this.currentPage = newPage;
    const firstElement = this.numberOfElementsPerPage * newPage;
    const lastElement = firstElement + this.numberOfElementsPerPage;
    this.photos = this.photosFromServer
      .filter(a => a.title.includes(this.currentSearch))
      .slice(firstElement, lastElement);
  }	  
}