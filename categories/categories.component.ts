import { Component } from "@angular/core";
import { CategoryService } from "src/Services/category.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent {
  categoryData: any;

  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.getcategoryListData().subscribe({
      next: (data: any) => {
        this.categoryData = data;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
