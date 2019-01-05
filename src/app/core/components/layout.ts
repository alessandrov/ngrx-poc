import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
      <ng-content></ng-content>
  `,
  styles: [
    `
    *, /deep/ * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `,
  ],
})
export class LayoutComponent  {

  constructor() {
  }
}
