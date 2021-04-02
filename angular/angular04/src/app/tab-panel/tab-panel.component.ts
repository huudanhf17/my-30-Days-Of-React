import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TabGroupComponent } from '../tab-group/tab-group.component';

@Component({
  selector: 'app-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.scss'],
})
export class TabPanelComponent implements OnInit {
  @Input() title!: string;
  @ViewChild(TemplateRef, { static: true }) panelBody!: TemplateRef<string>;

  constructor(private tabGroup: TabGroupComponent) {}

  ngOnInit(): void {
    this.tabGroup.addTab(this);
  }
}
