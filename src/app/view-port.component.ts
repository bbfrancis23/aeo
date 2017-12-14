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
    <header class="view-port-container">
      <div class="med-wrapper">
        <ng-content select="media"></ng-content>
      </div>
      <div class="view-port-content">
        <ng-content select="content"></ng-content>
      </div>
      <div class="view-port-overlay"></div>

    </header> `,
    styles: [`
      .view-port-container{
        height: 100vh;
        display: flex;
        align-items: center;
        color: #fff;
        max-width:  960px;
        padding-left: 1rem;
        padding-right: 1rem;
        margin: auto;
        text-align:  center;
      }

      .med-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
      }

      .view-port-overlay{
        height: 100vh;
        width: 100vw;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 1;
        opacity: .75
      }

      .view-port-content{
          z-index: 2;
          width: 100vw;
          font-family: "Montserrat", sans-serif;
      }
    `]
})
export class ViewPortComponent{

}

/* copyright AEO all right reserved */
