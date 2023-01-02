# Recipes Ionic Project

## Wireframes:
 wireframe of this project was created by me with draw.io:
The![recipes-ionic](https://user-images.githubusercontent.com/106282460/209329035-abfab097-789a-4255-86f6-f9b51eb489e3.png)

## Technologies Used:
* Ionic
* Angular
* FireBase BackEnd
* HTTP Requests
* SCSS

## Components and Pages structure
After sign up or log in, the user can toggle between the two main pages "Recipes list" and "My recipes" in the bottom of the screen:

* The **recipes list page** is a list of all the recipes of the database. By clicking the recipe the user is redirected to the recipe-detail page.

  * The **recipe detail page** show the name, the photo and the informations of the recipe from the FireBase database, in the informations section are displayed: the ingredients and the instructions. 

* **My recipes** page is a list of all the recipes created by the user. On the top-right corner of the page, there's a "+" button linked to the create recipe page. Every recipe of the list has a sliding botton with the edit button linked to the edit page of that specific item.

  * The **create recipe page** has a form with the recipe informations, in the header of the page there are two buttons: a "✓" button. To create the new recipe the user has to fill all the fields: image, name, ingredients and instructions and click the "✓" button in the header to sunmit the form. By submitting the form, the user is redirected to "my recipes" page where the new recipe is added at the end of the list.

  * The **update recipe page** has a form with all the recipes values saved in the database, in the header there are a submit button and a trash button. By submitting the form the recipe is updated in the database, and the changes can be visibles in the "recipes list" page and in "my recipes" page. The form validation checks if all the fields are correcltly filled.
Th the update page the user can also delete the recipe clicking the trash button in the header, before deleting the item, an alert shows up to validate if the user is sure to delete definitely the item. 

## SetUp
Run `ionic serve` for a dev server.

## Resources
IronHack material and internet research.

## Presentation
https://slides.com/ireneoliveto/bold-0f719e

## Trello
https://trello.com/invite/b/In4OqWZX/ATTI75dac8cd2b5be7a8beac4eeaa7df4b528321649F/ionic-project

## Created by
Irene Oliveto
