import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStoresComponent } from './manage-stores.component';

describe('ManageStoresComponent', () => {
  let component: ManageStoresComponent;
  let fixture: ComponentFixture<ManageStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
