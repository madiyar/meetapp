import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/types/category.types';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) { }

  categories: Category[] = [];

  ngOnInit(): void {
    this.categoriesService.getAll()
    .subscribe(
      data => {
        console.log(data);
        this.categories = data;
      }
    );
  }
}