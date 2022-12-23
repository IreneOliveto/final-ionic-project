export class Recipe {

  constructor(
    public id: string,
    public name: string,
    public edit: boolean,
    public image: string,
    private calories: number,
    private fat: number,
    private satfat: number,
    private carbs: number,
    private fiber: number,
    private sugar: number,
    private protein: number,
    public instructions: string,
    public ingredients: string[],
    private tags: string[],
    public userId: string
  ) { }


  // public get tags(): string[] {
  //   return this._tags;
  // }
  // public set tags(value: string[]) {
  //   this._tags = value;
  // }
  // public get ingredients(): string[] {
  //   return this._ingredients;
  // }
  // public set ingredients(value: string[]) {
  //   this._ingredients = value;
  // }
  // public get instructions(): string {
  //   return this._instructions;
  // }
  // public set instructions(value: string) {
  //   this._instructions = value;
  // }
  // public get protein(): number {
  //   return this._protein;
  // }
  // public set protein(value: number) {
  //   this._protein = value;
  // }
  // public get sugar(): number {
  //   return this._sugar;
  // }
  // public set sugar(value: number) {
  //   this._sugar = value;
  // }
  // public get fiber(): number {
  //   return this._fiber;
  // }
  // public set fiber(value: number) {
  //   this._fiber = value;
  // }

  // public get carbs(): number {
  //   return this._carbs;
  // }
  // public set carbs(value: number) {
  //   this._carbs = value;
  // }
  // public get satfat(): number {
  //   return this._satfat;
  // }
  // public set satfat(value: number) {
  //   this._satfat = value;
  // }
  // public get fat(): number {
  //   return this._fat;
  // }
  // public set fat(value: number) {
  //   this._fat = value;
  // }
  // public get calories(): number {
  //   return this._calories;
  // }
  // public set calories(value: number) {
  //   this._calories = value;
  // }
  // public get image(): string {
  //   return this._image;
  // }
  // public set image(value: string) {
  //   this._image = value;
  // }
  // public get edit(): boolean {
  //   return this._edit;
  // }
  // public set edit(value: boolean) {
  //   this._edit = value;
  // }
  // public get name(): string {
  //   return this._name;
  // }
  // public set name(value: string) {
  //   this._name = value;
  // }
  // public get id(): string {
  //   return this._id;
  // }
  // public set id(value: string) {
  //   this._id = value;
  // }
}

