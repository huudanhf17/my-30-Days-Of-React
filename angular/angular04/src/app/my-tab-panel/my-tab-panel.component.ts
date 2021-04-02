import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MyTabGroupComponent } from '../my-tab-group/my-tab-group.component';
import { TabContentDirective } from '../tab-content.directive';

@Component({
  selector: 'app-my-tab-panel',
  templateUrl: './my-tab-panel.component.html',
  styleUrls: ['./my-tab-panel.component.scss'],
})
export class MyTabPanelComponent implements OnInit {
  @Input() title!: string;
  @ViewChild(TemplateRef, { static: true }) implicitBody!: TemplateRef<unknown>;
  @ContentChild(TabContentDirective, { static: true, read: TemplateRef })
  explicitBody!: TemplateRef<unknown>;
  constructor(private tabGroup: MyTabGroupComponent) {}

  get panelBody(): TemplateRef<unknown> {
    return this.explicitBody;
  }

  ngOnInit(): void {
    console.log(this.explicitBody);
    this.tabGroup.addTab(this);
  }
}
