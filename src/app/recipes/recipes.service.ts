import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, switchMap, take, tap } from 'rxjs';

import { Recipe } from './recipe.model'

interface RecipeData {
  id: string,
  name: string,
  edit: boolean,
  image: string,
  // calories: number,
  // fat: number,
  // satfat: number,
  // carbs: number,
  // fiber: number,
  // sugar: number,
  // protein: number,
  instructions: string,
  ingredients: string[],
  // tags: string[]
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private _recipes = new BehaviorSubject<Recipe[]>([]);

  get recipes() {
    return this._recipes.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchRecipes() {
    return this.http
      .get<{ [key: string]: RecipeData }>(
        'https://recipes-project-a54e2-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(resData => {
          const recipes = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              recipes.push(
                new Recipe(
                  key,
                  resData[key].name,
                  resData[key].edit,
                  resData[key].image,
                  resData[key].instructions,
                  resData[key].ingredients
                )
              );
            }
          }
          return recipes;
        }),
        tap(recipes => {
          this._recipes.next(recipes);
        })
      );
  }

  getRecipe(id: string) {
    return this.http
      .get<RecipeData>(
      `https://recipes-project-a54e2-default-rtdb.firebaseio.com/recipes/${id}.json`,
        )
      .pipe(
        map(recipeData => {
          return new Recipe(
            id,
            recipeData.name,
            recipeData.edit,
            recipeData.image,
            recipeData.instructions,
            recipeData.ingredients
          );
        })
      );
  }

  addRecipe(
    name: string,
    image: string,
    instructions: string,
    ingredients: string[],
  ) {
    let generatedId: string;
    const newRecipe = new Recipe(
      Math.random().toString(),
      name,
      true,
      image,
      instructions,
      ingredients
      // this.authService.userId
    );
    return this.http
      .post<{ name: string }>(
        'https://recipes-project-a54e2-default-rtdb.firebaseio.com/recipes.json',
        {
          ...newRecipe,
          id: null
        }
      )
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.recipes;
        }),
        take(1),
        tap(recipes => {
          newRecipe.id = generatedId;
          this._recipes.next(recipes.concat(newRecipe));
        })
      );
  }


  updateRecipe(
    recipeId: string,
    name: string,
    instructions: string,
    ingredients: string[]
    ) {
    let updatedRecipes: Recipe[];
    return this.recipes.pipe(
      take(1),
      switchMap(recipes => {
        if (!recipes || recipes.length <= 0) {
          return this.fetchRecipes();
        } else {
          return of(recipes);
        }
      }),
      switchMap(recipes => {
        const updatedRecipeIndex = recipes.findIndex(r => r.id === recipeId);
        updatedRecipes = [...recipes];
        const oldRecipe = updatedRecipes[updatedRecipeIndex];
        updatedRecipes[updatedRecipeIndex] = new Recipe(
          oldRecipe.id,
          name,
          true,
          oldRecipe.image,
          instructions,
          ingredients,
          // oldRecipe.userId
        );
        return this.http.put(
          `https://recipes-project-a54e2-default-rtdb.firebaseio.com/recipes/${recipeId}.json`,
          { ...updatedRecipes[updatedRecipeIndex], id: null }
        );
      }),
      tap(() => {
        this._recipes.next(updatedRecipes);
      })
    );
  }

  deleteRecipe(recipeId: string) {
    return this.http
      .delete(
        `https://recipes-project-a54e2-default-rtdb.firebaseio.com/recipes/${recipeId}.json`
      )
      .pipe(
        switchMap(() => {
          return this.recipes;
        }),
        take(1),
        tap(recipes => {
          this._recipes.next(recipes.filter(r => r.id !== recipeId));
        })
      );
  }


}
