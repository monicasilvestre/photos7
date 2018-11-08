import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { EventEmitter } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let navigateSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navigateSpy = spyOn(component.navigate, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to previousPage', () => {
    component.currentPage = 1;
    fixture.detectChanges();

    component.previousPage();    
    expect(navigateSpy).toHaveBeenCalledWith(0);
  });

  it('should disable previousPage button when current page is 0', () => {
    let debug = fixture.debugElement
    component.currentPage = 0;
    fixture.detectChanges();

    expect(debug.nativeElement.querySelector('button.previous').disabled).toBeTruthy();
  });

  it('should go to nextPage', () => {
    component.currentPage = 1;
    fixture.detectChanges();

    component.nextPage();    
    expect(navigateSpy).toHaveBeenCalledWith(2);
  });

  it('should disable nextPage button when currentPage is lastPage', () => {
    let debug = fixture.debugElement
    component.currentPage = 0;
    component.lastPage = 0;
    fixture.detectChanges();

    expect(debug.nativeElement.querySelector('button.next').disabled).toBeTruthy();
  });
});