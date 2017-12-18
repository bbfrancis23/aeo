import { Component, Input, OnInit } from '@angular/core' ;

@Component({
  selector: 'item-search',
  template: `
  <div id="search-component">
      <input #searchBox id="search-box" (keyup)="search(searchBox.value)" class="form-control" type="text" placeholder="Search" aria-label="Search">
        <div class='search-result' *ngIf='searchResults'>
          <a *ngFor="let result of searchResults" class="dropdown-item" href="/{{result.link}}">{{result.title}}</a>
        </div>
    </div>`,

  styles: [`
    #search-box{
      width: 250px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    .search-result{
      width:250px;
      position: absolute;
      z-index: 99999;
      max-height: 350px;
      overflow-y: auto;
    }`]
})
export class ItemSearchComponent implements OnInit{
  searchResults = [];
  keyWords = [];

  @Input() milieuService: any;

  ngOnInit(){
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
    this.searchResults = [];
    if(string.length > 0){
    this.keyWords.forEach((word)=>{
      let regEx = new RegExp(string,'i')
      if(word['title'].match(regEx)){
        this.searchResults.push(word);
      }
    });
  }
  }
}
