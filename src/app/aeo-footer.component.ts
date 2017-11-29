import { Component } from '@angular/core';

@Component({
  selector: 'aeo-footer',
  template: `
    <footer class="fluid-container">
      <div class="row">
        <div class="col-lg-4">
          Powered By<br>
          <a href="http://angular.io"><img src="assets/img/angular.png" width="25px" height="25px"></a><br>
          <a href="http://nodejs.org"><img src="assets/img/node.svg" width="25px" height="25px"></a><br>
          <a href="https://mongodb.com"><img src="assets/img/mongo.png" width="25px" height="25px"></a><br>
          <a href="https://getbootstrap.com/"><img src="assets/img/bootstrap.svg" width="25px" height="25px"></a><br>
          <br>
        </div>
        <div class="col-lg-4">
          Technologies
        </div>
        <div class="col-lg-4">
          Guides
        </div>
      </div>
    </footer>`,
  styles:[`
    footer{
      background-color: black;
      color: white;
      text-align: center;
    }
  `]
})
export class AeoFooterComponent{

}
