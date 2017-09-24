import { Component, Input } from '@angular/core';
import { FilterTileComponent} from '../../../dash-board/components/ts/filter-tile';
import { Jem } from '../../../jem';

@Component({
  selector: 'jem-filter-tile',
  templateUrl: '../html/jem-filter-tile.html',
  styles: [`.topright {
                position: absolute;
                top: 5px;
                right: 5px;
            }`]
})
export class JemFilterTileComponent extends FilterTileComponent{
  @Input() jems: Jem[];
  jemsFiltered: Jem[];
  uniqueJemTypes = ['Mistakes', 'Best Practices', 'How to'];
  uniqueJemTechs = ['JavaScript', 'Git'];


  filters = { type: { list: [] }, tech: { list: [] }};

  constructor() {
    super();
  }

  filterJems(key:string, value: string):void{
    this.jemsFiltered = this.jems;
    this.jemsFiltered = this.filter(key,value, this.jemsFiltered);
    this.jemsFiltered = this.jemsFiltered.sort((a, b) => {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });



  }

}
