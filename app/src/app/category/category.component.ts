import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../shared/types/category.types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  form: FormGroup;
  category: Category;
  title: string = "New Category";

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      mergeMap(params => {
        if(params.get('id')) {
          this.title = "Edit Category";
          return this.categoriesService.getById(+params.get('id'));
        }
        return of(null);
      })
    )
    .subscribe(category => {
        this.category = category;
        if (this.category) {
          this.form.patchValue(this.category);
        }  
      }
    );

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      capacity: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    for (const i in this.form.controls) {
      if (this.form.controls[i]) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }

    if(!this.form.valid) {
      return;
    }

    // Update User
    if(this.category) {
      this.categoriesService.update({...this.category, ...this.form.value})
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res) {
          this.router.navigate(['categories']);
        }
      });
      return;
    }

    console.log(this.form.value);

    // Create User
    this.categoriesService.create(this.form.value)
      .pipe(catchError(() => of(null)))
      .subscribe(res => {
        if (res && res.id) {
          this.router.navigate(['categories']);
        }
      });
  }

}
