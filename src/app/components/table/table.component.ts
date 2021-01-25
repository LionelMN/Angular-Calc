import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface item {id:number, img:string, name:string, last:number, total:number}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  items: item[] =
  [
    {img:"osbf", name:"a", last:1, total:2, id:1},
    {img:"qwe", name:"b", last:2, total:2, id:2},
    {img:"rty", name:"c", last:4, total:5, id:3},
  ]
  constructor() { }

  faEdit = faEdit;
  faTrash = faTrash;

  editRow(id){
    alert(`edit button of ${id}`)
  }

  deleteRow(id ){
    alert(`delete button of ${id}`)
  }

  ngOnInit(): void {
  }

}
