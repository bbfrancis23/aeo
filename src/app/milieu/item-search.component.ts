import { Component, Input, OnInit } from '@angular/core' ;

@Component({
  selector: 'item-search',
  template:
    `<div id="search-component">
      <input #searchBox id="search-box" (keyup)="search(searchBox.value)" class="form-control search-box" type="text" placeholder="Search" aria-label="Search">
        <ul class='grot search-result' *ngIf='keyTerms'>
          <li *ngFor="let keyterm of keyTerms">
            <a href="/{{keyterm.link}}">{{keyterm.title}}</a>
          </li>
        </ul>
    </div>`,

  styles: [`

  .grot{
    position: fixed;
    z-index: 99999;
    //width: 1%;
    //text-align: right;
  }

  .search-box{
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .search-result li {
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  //width: inherit;
  //height: 16px;
  padding: 5px;
  background-color: white;
  cursor: pointer;
  list-style-type: none;
}

.search-result li:hover {
  background-color: #607D8B;
}

.search-result li a {
  color: #888;
  display: block;
  text-decoration: none;
}

.search-result li a:hover {
  color: white;
}
.search-result li a:active {
  color: white;
}



ul.search-result {
  margin-top: 0;
  padding-left: 0;
}
    `]
})
export class ItemSearchComponent implements OnInit{
  keyTerms = [];
  keyWords = [];
  @Input() milieuService: any;

  constructor(){
  }

  ngOnInit(){

    //console.log(this.milieuService.config.fields[0]);
    let count = 0;
    this.milieuService.config.fields.forEach((field)=>{
      count++;
      field['values'].forEach((value)=>{
        let directory = this.milieuService.utils.urlify(value['name'])
        this.keyWords.push({link: `${this.milieuService.config.directory}/${field['name']}/${this.milieuService.utils.urlify(value['name'])}`, title: value['name']});

        if(count < this.milieuService.config.fields.length) {
          let subField = (this.milieuService.config.fields[count]);

          subField['values'].forEach((subValue)=>{
            this.keyWords.push({link: `${this.milieuService.config.directory}/${field['name']}/${this.milieuService.utils.urlify(value['name'])}/${subField['name']}/${this.milieuService.utils.urlify(subValue['name'])}`, title: `${value['name']} ${subValue['name']}`} );
          });
        }
      });
    });
  }



  search(string: ''){
    this.keyTerms = [];
    this.keyWords.forEach((word)=>{
      let regEx = new RegExp(string,'i')
      if(word['title'].match(regEx)){
        this.keyTerms.push(word);
      }
    });
  }
}
