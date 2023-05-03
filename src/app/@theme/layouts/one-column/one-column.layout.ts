import { Component } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
  <ng-content select="nb-menu"></ng-content>
  <hr>
  <div class="logo" style=
    "align-items: center;
    /* display: flex; */
    justify-content: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 20px;">
    <img src="assets/images/logo.png" alt="logo" style="width: 100px; height: 100px;">
    <div style="margin-top: 10px;"><strong>FootNet</strong></div>
  </div>
</nb-sidebar>



      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {}
