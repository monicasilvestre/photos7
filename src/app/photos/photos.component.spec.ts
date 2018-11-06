import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosComponent } from './photos.component';
import { PhotoService } from '../photo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Photo } from '../photo';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let photoService: PhotoService;
  let photoServiceSpy: jasmine.Spy;
  let fixture: ComponentFixture<PhotosComponent>;
  const mockPhoto: Photo[] = [{
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosComponent ],
      providers: [ PhotoService ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    photoService = TestBed.get(PhotoService);
    photoServiceSpy = spyOn(photoService, 'getPhotos');
    photoServiceSpy.and.returnValue(of(mockPhoto));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get photos', () => {
    expect(photoServiceSpy).toHaveBeenCalled();
    expect(component.photos).toEqual(mockPhoto);
  });
});
