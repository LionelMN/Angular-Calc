import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ItemsService } from '../../services/items/items.service';

interface item {_id:number, img:string, name:string, last:number, total:number};
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  parseNumber = (n:any):number | null => !n ? 0 : Number(n)

  items: item[]
  constructor(private itemsService : ItemsService) { }

  public getAll(){
    this.itemsService.getAll().subscribe(bdItems => this.items = bdItems)
  }

  editRow(id){
    alert(`edit button of ${id}`)
  }

  deleteRow(id ){
    alert(`delete button of ${id}`)
  }

  ngOnInit(): void {
    this.getAll()
  }

}
