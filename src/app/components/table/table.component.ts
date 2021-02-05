import { Component, OnInit, Inject } from '@angular/core';
import { faPlus, faMinus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ItemsService } from '../../services/items/items.service';
import { DOCUMENT } from '@angular/common';

interface item {_id:number, img:string, name:string, last:number, total:number};
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  faPlus = faPlus;
  faMinus = faMinus;
  faEdit = faEdit;
  faTrash = faTrash;

  items: item[]
  constructor(
    private itemsService : ItemsService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  public getAll(){
    this.itemsService.getAll().subscribe(bdItems => this.items = bdItems)
  }

  plus(item : item, column : string) : void{
    if (column === 'last'){
      if (item.last < item.total){
        item.last ++
      } else {
        item.last ++;
        item.total ++;
      }
    } else {
      item.total = item.total + 1;
    }
    this.editRow(item)
  }

  minus(item : item, column : string) : void{
    if (column === 'last'){
      if (item.last > 0){
        item.last --
      }
    } else {
      if (item.total > 0){
        if (item.total > item.last){
          item.total --;
        } else {
          item.total --;
          item.last --;
        }
      }
    }
    this.editRow(item)
  }

  validateName(name:string, item:item){
    if (name){
      item.name = name
      this.editRow(item)
    }
  }

  editRow(item : item){
    this.itemsService.edit(item).subscribe()
    console.log(item);

  }

  deleteRow(name : string){
    this.itemsService.remove(name).subscribe( () => {
      this.document.location.reload();
    });
  }

  ngOnInit(): void {
    this.getAll()
  }

}
