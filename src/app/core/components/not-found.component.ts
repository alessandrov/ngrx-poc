import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // selector: 'app-not-found',
  template: `<div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="error-template">
          <h2>
            Oops!</h2>
          <div class="error-details">
            The page you requested was not found
          </div>
          <div class="error-actions">
            <a class="btn btn-primary btn-md" routerLink="/"><span
              class="glyphicon glyphicon-home"></span>Take Me Home, Country Road</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./not-found.component.scss']
})

export class NotFoundComponent {

  constructor() {}

}
