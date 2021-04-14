import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-example-container',
  templateUrl: './example-container.component.html',
  styleUrls: ['./example-container.component.scss'],
})
export class ExampleContainerComponent implements OnInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true })
  containerRef: ViewContainerRef;

  @ViewChild('sdynamicComponent', { read: ViewContainerRef, static: true })
  scontainerRef: ViewContainerRef;

  title = 'Example Container';

  constructor(private cfr: ComponentFactoryResolver) {}

  ngOnInit() {}

  async addDynamicCompOne() {
    this.containerRef.clear();
    this.scontainerRef.clear();
    const { DynamicContentOneComponent } = await import(
      '../dynamic-content-one/dynamic-content-one.component'
    );
    const componentFactory = this.cfr.resolveComponentFactory(
      DynamicContentOneComponent
    );
    const componentRef = this.containerRef.createComponent(componentFactory);
    componentRef.instance.data = 'INPUT DATA 1';

    componentRef.instance.buttonClicked.subscribe(
      (value) => (this.title = value)
    );
    const componentRef2 = this.scontainerRef.createComponent(componentFactory);
    componentRef2.instance.data = 'INPUT DATA 1';
  }

  async addDynamicCompTwo() {
    this.containerRef.clear();
    const { DynamicContentTwoComponent } = await import(
      '../dynamic-content-two/dynamic-content-two.component'
    );
    const componentFactory = this.cfr.resolveComponentFactory(
      DynamicContentTwoComponent
    );
    const componentRef = this.containerRef.createComponent(componentFactory);
  }

  clearDynamicComp() {
    this.containerRef.clear();
    this.scontainerRef.clear();
  }

  onBtnClicked(ev) {
    console.log(ev);
  }
}
