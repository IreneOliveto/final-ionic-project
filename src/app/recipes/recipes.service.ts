import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';

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


}
