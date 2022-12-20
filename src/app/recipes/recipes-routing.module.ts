import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesPage } from './recipes.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: RecipesPage,
    children: [
      {
        path: 'recipes-list',
        children: [
          {
            path: '',
            loadChildren: () => import('./recipes-list/recipes-list.module').then( m => m.RecipesListPageModule)
          },
          {
            path: ':recipeId',
            loadChildren: () => import('./recipe-detail/recipe-detail.module').then(m => m.RecipeDetailPageModule)
          }
        ]
      },
      {
        path: 'my-recipes',
        children: [
          {
            path: '',
            loadChildren: () => import('./my-recipes/my-recipes.module').then(m => m.MyRecipesPageModule)
          },
          {
            path: 'new',
            loadChildren: () => import('./my-recipes/new-recipe/new-recipe.module').then(m => m.NewRecipePageModule)
          },
          {
            path: 'edit/:recipeId',
            loadChildren: () => import('./my-recipes/edit-recipe/edit-recipe.module').then(m => m.EditRecipePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/recipes/tabs/recipes-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/recipes/tabs/recipes-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}
