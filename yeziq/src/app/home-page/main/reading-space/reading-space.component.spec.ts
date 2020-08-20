import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingSpaceComponent } from './reading-space.component';

describe('ReadingSpaceComponent', () => {
  let component: ReadingSpaceComponent;
  let fixture: ComponentFixture<ReadingSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
