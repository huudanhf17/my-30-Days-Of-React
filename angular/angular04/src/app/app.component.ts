import { Component, VERSION, ViewChild } from '@angular/core';
import { ToggleComponent } from './toggle/toggle.component';

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

  ngAfterViewInit() {
    console.log(this.toggleComp);
  }
}
