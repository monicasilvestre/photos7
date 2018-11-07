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
  
  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos(): void {
    this.photoService
      .getPhotos()
      .subscribe(photos => {
        this.photosFromServer = this.photos = photos;
      });
  }

  search(newSearch: string) {
    this.currentSearch = newSearch.trim();
    this.photos = this.photosFromServer
    .filter(a => a.title.includes(this.currentSearch))
  }
}