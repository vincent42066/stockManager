import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShelfComponent } from './manage-shelf.component';

describe('ManageShelfComponent', () => {
  let component: ManageShelfComponent;
  let fixture: ComponentFixture<ManageShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageShelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
