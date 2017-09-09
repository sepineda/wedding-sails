import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWeddingComponent } from './new-wedding.component';

describe('NewWeddingComponent', () => {
  let component: NewWeddingComponent;
  let fixture: ComponentFixture<NewWeddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWeddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWeddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
