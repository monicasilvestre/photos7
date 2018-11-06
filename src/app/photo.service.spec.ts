import { PhotoService } from './photo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Photo } from './photo';

describe('Photo Service', () => {
  let photoService: PhotoService;
  let httpTestingController: HttpTestingController;
  const mockPhotos: Photo[] = [{
    'albumId': 1,
    'id': 1,
    'title': 'accusamus beatae ad facilis cum similique qui sunt',
    'url': 'https://via.placeholder.com/600/92c952',
    'thumbnailUrl': 'https://via.placeholder.com/150/92c952'
  },
  {
    'albumId': 1,
    'id': 2,
    'title': 'reprehenderit est deserunt velit ipsam',
    'url': 'https://via.placeholder.com/600/771796',
    'thumbnailUrl': 'https://via.placeholder.com/150/771796'
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    photoService = TestBed.get(PhotoService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(photoService).toBeTruthy();
  });

  describe('getPhotos', () => {
    it('should call the photos api', () => {
      photoService.getPhotos()
        .subscribe(data =>{
          expect(data).toEqual(mockPhotos)
        });
  
      const req = httpTestingController.expectOne('http://jsonplaceholder.typicode.com/photos');
      expect(req.request.method).toEqual('GET');
      req.flush(mockPhotos);
    });
  })
});