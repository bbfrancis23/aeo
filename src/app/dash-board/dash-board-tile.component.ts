'use strict';

export class DashBoardTileComponent {
  show = true;
  modal: HTMLElement;// = document.getElementById('listModal');
  modalMode = false;


  outSideClick(e) {
    //console.log(e.target.id, this.modal.id);
    if (e.target.id === this.modal.id) {
      this.modalMode = false;
      //console.log('they are a match');
    } else {
      //console.log('they are different');
    }
  }
}

/* copyright AEO all right reserved */
