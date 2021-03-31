import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular04';
  name = 'Angular ' + VERSION.major;
  isDanger = false;
  isWarning = false;
  currentProgress = 70;
  checked = false;
  checked2 = true;
  counter = 1;
  navs = ['Active', 'Link 1', 'Link 2'];
}
