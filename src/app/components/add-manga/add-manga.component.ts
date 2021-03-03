import { Component, OnInit, Inject } from '@angular/core';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ItemsService } from '../../services/items/items.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-add-manga',
  templateUrl: './add-manga.component.html',
  styleUrls: ['./add-manga.component.css']
})
export class AddMangaComponent implements OnInit {

  isHidden : boolean = true;

  createFormGroup() {
    return new FormGroup({
      img : new FormControl(''),
      name : new FormControl('', [Validators.required, Validators.minLength(2)]),
      last : new FormControl(0, Validators.min(0)),
      total : new FormControl(0, Validators.min(0))
    });
  }

  mangaForm : FormGroup;

  faPlus = faPlus;
  faEdit = faEdit;

  constructor(
    private itemsService : ItemsService,
    @Inject(DOCUMENT) private document: Document
    ) {
    this.mangaForm = this.createFormGroup();
   }

  ngOnInit(): void {
  }

  onResetForm(){
    this.mangaForm.reset();
  }

  onSaveForm(){
    if (this.mangaForm.valid){
      if(!this.mangaForm.value.img){
        this.mangaForm.value.img = 'default.png'
      } else {
        this.mangaForm.value.img = this.aux
      }
      this.itemsService.create(this.mangaForm.value).subscribe();
      this.onResetForm();
      console.log(this.mangaForm.value)
      this.document.location.reload();
    } else {
      console.log('Not valid');
    }
  }

  get name(){ return this.mangaForm.get('name'); }

  showForm(){
    this.isHidden = !this.isHidden
  }

  url : string
  aux : string

  onSelectFile(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.aux = e.target.files[0].name;
      console.log(e.target.files[0].name)
      reader.onload = (event:any)=> {
        this.url = event.target.result;
      }
    }
  }

}
