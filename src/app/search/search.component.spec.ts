import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    spyOn(component.search, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event', () => {
    const component = fixture.componentInstance; 
    const term = 'kitten';

    component.onSearch(term);
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledWith(term);
  });
});
