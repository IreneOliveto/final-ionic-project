import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeId: string;
  form: FormGroup;
  isLoading = false;
  private recipeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        this.navCtrl.navigateBack('/recipes/tabs/my-recipes');
        return;
      }
      this.recipeId = paramMap.get('recipeId');
      this.isLoading = true;
      this.recipeSub = this.recipesService
        .getRecipe(paramMap.get('recipeId'))
        .subscribe(
          recipe => {
            this.recipe = recipe;
            this.form = new FormGroup({
              name: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              image: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              instructions: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
              }),
              ingredients: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.min(1)]
              })
            });
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: 'An error occurred!',
                message: 'Recipe could not be fetched. Please try again later.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/recipes/tabs/my-recipes']);
                    }
                  }
                ]
              })
              .then(alertEl => {
                alertEl.present();
              });
          }
        );
    });
  }

  editRecipe() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating recipe...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.recipesService
          .updateRecipe(
            this.recipe.id,
            this.form.value.name,
            this.form.value.ingredients,
            this.form.value.instructions
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/recipes/tabs/my-recipes', this.recipeId]);
          });
      });
  }

  deleteRecipe() {
    this.alertCtrl.create({
      header:'Are you really sure?',
      message:'Do you really want to delete the recipe?',
      buttons: [{
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Delete',
          handler: () => {
            this.recipesService.deleteRecipe(this.recipe.id);
            this.router.navigate(['/recipes/tabs/my-recipes']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present()
    });
    this.loadingCtrl.create({ message: 'Deleting...' })
    .then(loadingEl => {
      loadingEl.present();
      this.recipesService.deleteRecipe(this.recipeId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }

}
