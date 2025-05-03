import { Component, Input, OnInit } from "@angular/core";
import { ICategory, IHeading, menu } from "./menu";

@Component({
    selector: 'sections-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.less']
})
export class SideMenuComponent implements OnInit {
    menu: IHeading[] = menu;
    /** Выбранный раздел */
    selectedSection: undefined | any;
    selectedCategory: ICategory[] | undefined;
    selectedHeadId: number | undefined;
    selectedCategoryId: number | undefined;
    
    selectedSubcategory: any;
    @Input() menuActive: boolean | undefined;

    constructor() {}

    ngOnInit(): void {
    }

    toggleCategory(heading: IHeading): void {
        this.selectedHeadId = heading.headId;
        this.selectedCategory = heading.categories;
    }

    selectSubcategory(category: any) {
        this.selectedCategoryId = category.categoryId;
        this.selectedSubcategory = category.subcategories;
    }

    closeCategory(): void {
        this.selectedCategory = undefined;
        this.selectedSubcategory = undefined;
        // TODO: if !menuActive
    }

    closeMenu(): void {
        this.selectedCategory = undefined;
        this.selectedSubcategory = undefined;
        this.selectedHeadId = undefined;
    }

    trackByFn(index: number, heading: any): number {
        return heading.headId;
    }

    /// Роутинг по категориям
    routeCategory(): void {
        // using angular Router route to searching page with filter category
    }

    routeSection(): void {
        // route with category & section filter
    }

    routeSubcategory(): void {
        // route with category & section & subcategory
    }
}
  