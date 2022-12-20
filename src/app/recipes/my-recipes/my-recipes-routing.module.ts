import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRecipesPage } from './my-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: MyRecipesPage
  },
  {
    path: 'create',
    loadChildren: () => import('./new-recipe/new-recipe.module').then( m => m.NewRecipePageModule)
  },
  {
    path: 'edit/:recipeId',
    loadChildren: () => import('./edit-recipe/edit-recipe.module').then( m => m.EditRecipePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRecipesPageRoutingModule {}
