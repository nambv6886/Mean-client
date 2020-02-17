export class Hero {
  name: string;
  id: number;
  attack: number;
  defense: number;
  heroClass: string;
  imagePath: string;

  // constructor(name: string, heroClass: string, attack: number, defense: number, imagePath: string) {
  //   this.name = name;
  //   this.heroClass = heroClass;
  //   this.attack = attack;
  //   this.defense = defense;
  //   this.imagePath = imagePath;
  // }

  constructor(fields: Partial<Hero>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

}

// export enum HeroType {
//   A,
//   B,
//   C,
//   D
// }
