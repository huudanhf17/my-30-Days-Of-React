import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-content-one',
  templateUrl: './dynamic-content-one.component.html',
  styleUrls: ['./dynamic-content-one.component.scss'],
})
export class DynamicContentOneComponent implements OnInit {
  @Input()
  data: string;

  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  onBtnClick(ev) {
    this.buttonClicked.emit(ev);
  }
}
