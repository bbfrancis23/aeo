import { Component } from '@angular/core';

@Component({
  template: `
  <div class="background-sky hero" ></div>
    <view-port>
      <media><video  src="assets/img/code.mov" autoplay="true" loop="true" ></video></media>
      <content>

              <h1>AEO - TECH</h1>
              <h2> Home of Code Jems</h2>
              <p>As a programmer do you find your self looking up the same documentation over and over. Then looking forever till you find what you want...</p>
              <p>Code Jems are small, searchable, filterable, customizable easy to understand code snippets.</p>
              <p>Perfect for quick reference and custom 'Cheat Sheets'.</p>
              <a href="code-jems/tech/angular"><img src="assets/img/angular.png" width="50px"></a>
              <a href="code-jems/tech/css"><img src="assets/img/css.png" width="40px"></a>
              <a href="code-jems/tech/css"><img src="assets/img/html.png" width="40px"></a>
              <a href="code-jems/tech/css"><img src="assets/img/javascript.png" width="40px"></a>
              <a href="code-jems/tech/css"><img src="assets/img/mongo.png" width="40px"></a>
      </content>
    </view-port>
  `,
  styles: [`
  `]
})
export class HomeComponent{

}
