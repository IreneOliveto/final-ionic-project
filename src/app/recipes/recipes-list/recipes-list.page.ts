import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesListPage implements OnInit, OnDestroy {
  loadedRecipes: Recipe[];
  listedLoadedRecipes: Recipe[];
  relevantRecipes: Recipe[];
  isLoading = false;
  private recipesSub: Subscription;

  constructor(
    private recipesService: RecipesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.recipesSub = this.recipesService.recipes.subscribe(recipes => {
      this.loadedRecipes = recipes;
      this.relevantRecipes = this.loadedRecipes;
      this.listedLoadedRecipes = this.relevantRecipes.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.recipesService.fetchRecipes().subscribe(() => {
      this.isLoading = false;
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  // onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
  //   if (event.detail.value === 'all') {
  //     this.relevantRecipes = this.loadedRecipes;
  //     this.listedLoadedRecipes = this.relevantRecipes.slice(1);
  //   } else {
  //     this.relevantRecipes = this.loadedRecipes.filter(
  //       recipe => recipe.userId !== this.authService.userId
  //     );
  //     this.listedLoadedRecipes = this.relevantRecipes.slice(1);
  //   }
  // }

  ngOnDestroy() {
    if (this.recipesSub) {
      this.recipesSub.unsubscribe();
    }
  }

}
