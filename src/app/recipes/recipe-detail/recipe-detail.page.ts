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
    private recipesService: RecipesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    // private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    // private authService: AuthService,
    private alertCtrl: AlertController,
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
            // this.isEditable = recipe.userId !== this.authService.userId;
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

  //onBookPlace
  editableRecipe() {
    // this.router.navigateByUrl('/recipes/tabs/recipes-list');
    // this.navCtrl.navigateBack('/recipes/tabs/recipes-list');
    // this.navCtrl.pop();

    // this.actionSheetCtrl
    //   .create({
    //     header: 'Choose an Action',
    //     buttons: [
    //       {
    //         text: 'Select Date',
    //         handler: () => {
    //           this.openBookingModal('select');
    //         }
    //       },
    //       {
    //         text: 'Random Date',
    //         handler: () => {
    //           this.openBookingModal('random');
    //         }
    //       },
    //       {
    //         text: 'Cancel',
    //         role: 'cancel'
    //       }
    //     ]
    //   })
    //   .then(actionSheetEl => {
    //     actionSheetEl.present();
    //   });
  }

  openBookingModal(mode: 'select' | 'random') {
    // console.log(mode);
    // this.modalCtrl
    //   .create({
    //     component: CreateBookingComponent,
    //     componentProps: { selectedPlace: this.place, selectedMode: mode }
    //   })
    //   .then(modalEl => {
    //     modalEl.present();
    //     return modalEl.onDidDismiss();
    //   })
    //   .then(resultData => {
    //     if (resultData.role === 'confirm') {
    //       this.loadingCtrl
    //         .create({ message: 'Booking place...' })
    //         .then(loadingEl => {
    //           loadingEl.present();
    //           const data = resultData.data.bookingData;
    //           this.bookingService
    //             .addBooking(
    //               this.place.id,
    //               this.place.title,
    //               this.place.imageUrl,
    //               data.firstName,
    //               data.lastName,
    //               data.guestNumber,
    //               data.startDate,
    //               data.endDate
    //             )
    //             .subscribe(() => {
    //               loadingEl.dismiss();
    //             });
    //         });
    //     }
    //   });
  }

  ngOnDestroy() {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }
}
