# Recipes Ionic Project

## Wireframes:
The wireframe of this project was created by me with draw.io:

## Technologies Used:
* Ionic
* Ionic UI
* Angular
* FireBase BackEnd
* CSS

## Components and Pages structure
In the bottom of this app the user can toggle between two main pages:

* The **recipes list page** is a list of all the recipes of the database. By clicking on the recipe the user is redirected to the recipe-detail page.

  * The **recipe detail page** show the name, the photo and the informations of the recipe from the FireBase, in the information section are displayed: the ingredients and the instructions. 

* In **my recipes** page there are all the recipes created by the user. On the top-right corner of the page, there's a + button linked to the create recipe page and every recipe of the list has a sliding botton with the edit button linked to the edit page of that specific item.

  * The **create recipe page** has a form with the recipe informations, in the header of the page there are two buttons: a "check" button, clickable . By submitting the form, the user is redirected to "my recipes" page where the new recipe is added at the end of the list. The form validation checks if all the fields are filled.

  * The **update recipe page** has a form with all the recipes values saved in the database and a submit button. By submitting the form, the recipe will be updated in the database. The form validation checks if all the fields are filled.

## SetUp
Run `ionic serve` for a dev server.

## Resources
IronHack material and internet research.

## Presentation
https://slides.com/ireneoliveto/bold-0f719e

## Trello
https://trello.com/w/ionicproject5/account

## Created by
Irene Oliveto
