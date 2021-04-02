import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTabGroupComponent } from './my-tab-group.component';

describe('MyTabGroupComponent', () => {
  let component: MyTabGroupComponent;
  let fixture: ComponentFixture<MyTabGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTabGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
