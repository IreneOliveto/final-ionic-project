import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { Recipe } from './recipe.model'

interface RecipeData {
  id: string,
  name: string,
  edit: boolean,
  image: string,
  calories: number,
  fat: number,
  satfat: number,
  carbs: number,
  fiber: number,
  sugar: number,
  protein: number,
  instructions: string,
  ingredients: string[],
  tags: string[],
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private _recipes = new BehaviorSubject<Recipe[]>([]);

  get recipes() {
    return this._recipes.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchRecipes() {
    return this.http
      .get<{ [key: string]: RecipeData }>(
        `https://recipes-project-a54e2-default-rtdb.firebaseio.com/recipes.json`
        // ?orderBy="userId"&equalTo="${this.authService.userId}"
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
                  resData[key].calories,
                  resData[key].fat,
                  resData[key].satfat,
                  resData[key].carbs,
                  resData[key].fiber,
                  resData[key].sugar,
                  resData[key].protein,
                  resData[key].instructions,
                  resData[key].ingredients,
                  resData[key].tags,
                  resData[key].userId
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
            recipeData.calories,
            recipeData.fat,
            recipeData.satfat,
            recipeData.carbs,
            recipeData.fiber,
            recipeData.sugar,
            recipeData.protein,
            recipeData.instructions,
            recipeData.ingredients,
            recipeData.tags,
            recipeData.userId
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
    let newRecipe: Recipe;
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('No user id found!');
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        if (!fetchedUserId) {
          throw new Error('No user found!');
        }
        newRecipe = new Recipe(
        Math.random().toString(),
        name,
        true,
        image,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        instructions,
        ingredients,
        [''],
        fetchedUserId
    );
    return this.http
      .post<{ name: string }>(
        'https://recipes-project-a54e2-default-rtdb.firebaseio.com/recipes.json?auth=${token}',
        {
          ...newRecipe,
          id: null
        }
      );
      }),
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
    image: string,
    instructions: string,
    ingredients: string[]
    ) {
    let updatedRecipes: Recipe[];
    let fetchedToken: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        fetchedToken = token;
        return this.recipes;
      }),
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
          image,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          instructions,
          ingredients,
          [],
          oldRecipe.userId
        );
        return this.http.put(
          `https://recipes-project-a54e2-default-rtdb.firebaseio.com/recipes/${recipeId}.json?auth=${fetchedToken}`,
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
