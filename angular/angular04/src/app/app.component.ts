import { Component, VERSION, ViewChild } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { ToggleComponent } from './toggle/toggle.component';

const observer = {
  next: (val: any) => console.log(val),
  err: (val: any) => console.log(val),
  complete: () => console.log('complete'),
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(ToggleComponent) toggleComp!: ToggleComponent;

  title = 'angular04';
  name = 'Angular ' + VERSION.major;
  isDanger = false;
  isWarning = false;
  currentProgress = 70;
  checked = false;
  checked2 = true;
  counter = 1;
  navs = ['Active', 'Link 1', 'Link 2'];
  currentIndex = 0;
  myCurrentIndex = 0;
  date = new Date();
  user = { name: 'Angular', ver: 11 };
  intervals = interval(1000);

  ngOnInit() {
    of(1, 2, 3, 4);
  }

  ngAfterViewInit() {
    console.log(this.toggleComp);
  }
}
