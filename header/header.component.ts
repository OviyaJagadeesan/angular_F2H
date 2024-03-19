import { Component } from '@angular/core';
import { CategoryService } from 'src/Services/category.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  categoryList: any;
  contentColor: string = 'black';
  isExploreClicked: boolean = false;
  Pincode: string = '';
  District: string = '';
  searchValue: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  showCategoryList = false;
  showLocationList = false;
  showSearch: boolean = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  closeSearch() {
    this.showSearch = false;
    this.searchValue = '';
  }

  toggleCategoryList() {
    this.showCategoryList = !this.showCategoryList;
    console.log(this.showCategoryList);
  }
  toggleCategoryListOff() {
    this.showCategoryList = false;
  }

  goCategories(){
    this.toggleCategoryListOff();
    this.router.navigate(["/categories"]);
  }
  ngOnInit(): void {
    this.categoryService.getcategoryData().subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  exploreClicked() {
    this.isExploreClicked = true;
  }
}
