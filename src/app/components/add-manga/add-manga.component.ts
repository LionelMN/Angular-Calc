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
      }
      this.itemsService.create(this.mangaForm.value).subscribe();
      this.onResetForm();
      this.document.location.reload();
    } else {
      console.log('Not valid');

    }
  }

  get name(){ return this.mangaForm.get('name'); }
  get last(){ return this.mangaForm.get('last'); }
  get total(){ return this.mangaForm.get('total'); }

  showForm(){
    this.isHidden = !this.isHidden
  }

}
