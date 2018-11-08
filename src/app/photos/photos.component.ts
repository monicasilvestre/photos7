import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photosFromServer: Photo[];
  filteredPhotos: Photo[];
  photos: Photo[];
  currentSearch = '';
  numberOfElementsPerPage = 12;
  currentPage = 0;
  lastPage = 0;
  
  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos(): void {
    this.photoService
      .getPhotos()
      .subscribe(photos => {
        this.photosFromServer = this.photos = this.filteredPhotos = photos;
        this.paginate(0);
      });
  }

  search(newSearch: string) {
    this.currentSearch = newSearch.trim();
    this.filteredPhotos = this.photosFromServer
      .filter(a => a.title.includes(this.currentSearch));
    this.paginate(0);
  }

  paginate(newPage: number): void {
    this.currentPage = newPage;
    this.lastPage = Math.floor(this.filteredPhotos.length / this.numberOfElementsPerPage);
    const firstElement = this.numberOfElementsPerPage * newPage;
    const lastElement = firstElement + this.numberOfElementsPerPage;
    this.photos = this.filteredPhotos.slice(firstElement, lastElement);
  }	
}