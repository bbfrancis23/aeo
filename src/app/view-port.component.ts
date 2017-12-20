import { Component } from '@angular/core';

'use strict'

/*
  Author: Brian Francis
  Description: Creates a fullscreen Component with background media

  QA: 11-28-2017
*/

@Component({
  selector: 'view-port',
  template: `
    <div class="view-port-container">
      <div class="media-wrapper">
        <ng-content select="media"></ng-content>
      </div>
      <div class="view-port-content">
        <ng-content select="content"></ng-content>
      </div>
      <div class="view-port-overlay"></div>
    </div> `,
    styles: [`
      .media-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
      }
    `]
})
export class ViewPortComponent{

}

/* copyright AEO all right reserved */
