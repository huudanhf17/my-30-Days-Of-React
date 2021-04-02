import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTabPanelComponent } from './my-tab-panel.component';

describe('MyTabPanelComponent', () => {
  let component: MyTabPanelComponent;
  let fixture: ComponentFixture<MyTabPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTabPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTabPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
