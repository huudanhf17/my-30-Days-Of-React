import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyTabPanelComponent } from '../my-tab-panel/my-tab-panel.component';

@Component({
  selector: 'app-my-tab-group',
  templateUrl: './my-tab-group.component.html',
  styleUrls: ['./my-tab-group.component.scss'],
})
export class MyTabGroupComponent implements OnInit {
  panelList: MyTabPanelComponent[] = [];
  @Input() selectedIndex = 0;
  @Output() selectedIndexChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log(this.panelList);
  }

  addTab(tab: MyTabPanelComponent) {
    this.panelList = [...this.panelList, tab];
  }

  removeTab(tab: MyTabPanelComponent) {
    this.panelList = this.panelList.filter((value) => value !== tab);
    if (this.selectedIndex === this.panelList.length) {
      this.selectedIndexChange.emit(this.panelList.length - 1);
    }
  }
}
