import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabPanelComponent } from '../tab-panel/tab-panel.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent implements OnInit {
  tabPanelList: TabPanelComponent[] = [];
  @Input() activeIndex = 0;
  @Output() activeIndexChange = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log(this.tabPanelList);
  }

  addTab(tab: TabPanelComponent) {
    this.tabPanelList = [...this.tabPanelList, tab];
  }

  removeTab(tab: TabPanelComponent) {
    let found = -1;
    this.tabPanelList = this.tabPanelList.filter((tp, index) => {
      if (tp === tab) {
        found = index;
        return false;
      }
      return true;
    });
    if (found === this.activeIndex) {
      this.activeIndexChange.emit(
        found === this.tabPanelList.length ? found - 1 : found
      );
    }
  }
}
