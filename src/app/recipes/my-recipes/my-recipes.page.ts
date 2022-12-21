import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.page.html',
  styleUrls: ['./my-recipes.page.scss'],
})
export class MyRecipesPage implements OnInit , OnDestroy {
  myRecipes: Recipe[];
  isLoading = false;
  private recipesSub: Subscription;

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit() {
    this.recipesSub = this.recipesService.recipes.subscribe(recipes => {
      this.myRecipes = recipes.filter(recipe => recipe.edit === true);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.recipesService.fetchRecipes()
    .subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(myRecipeId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'recipes', 'tabs', 'my-recipes', 'edit', myRecipeId]);
  }

  ngOnDestroy() {
    if (this.recipesSub) {
      this.recipesSub.unsubscribe();
    }
  }
}
