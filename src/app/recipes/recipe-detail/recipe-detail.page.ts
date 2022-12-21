import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit, OnDestroy {
  recipe: Recipe;
  isEditable = false;
  isLoading = false;
  private recipeSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private recipesService: RecipesService,    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        this.navCtrl.navigateBack('/recipes/tabs/recipes-list');
        return;
      }
      this.isLoading = true;
      this.recipeSub = this.recipesService
        .getRecipe(paramMap.get('recipeId'))
        .subscribe(
          recipe => {
            this.recipe = recipe;
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: 'An error ocurred!',
                message: 'Could not load this recipe.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/recipe/tabs/recipes-list']);
                    }
                  }
                ]
              })
              .then(alertEl => alertEl.present());
          }
        );
    });
  }

  ngOnDestroy() {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }
}
