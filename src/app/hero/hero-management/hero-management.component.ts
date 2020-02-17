import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from '../mimeType-validator';

@Component({
  selector: 'app-hero-dashboard',
  templateUrl: './hero-management.component.html',
  styleUrls: ['./hero-management.component.css']
})
export class HeroManagementComponent implements OnInit {

  selected: Hero;
  heroes: Hero[] = [];
  isLoading = false;
  imagePreview: string;
  heroForm: FormGroup;
  isCreating = false;

  constructor(
    private location: Location,
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.heroForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      attack: new FormControl(null, {
        validators: [Validators.required]
      }),
      defense: new FormControl(null, {
        validators: [Validators.required]
      }),
      heroClass: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.getHeroes();
  }

  async getHeroes() {
    try {
      this.isLoading = true;
      this.heroes = await this.heroService.getHeroes();
      this.isLoading = false;
      const id = +this.route.snapshot.paramMap.get('id');
      if (id) {
        this.selected = await this.heroService.getHero(id);
      } else {
        this.selected = this.heroes[0];
      }
    } catch (e) {
      console.log(e);
    }
    // this.heroService.getHeroes().subscribe(heroes => {
    //   this.heroes = heroes;
    //   const id = +this.route.snapshot.paramMap.get('id');
    //   if (id) {
    //     this.heroService.getHero(id).subscribe(hero => {
    //       this.selected = hero;
    //       this.isLoading = false;
    //     });
    //   } else {
    //     this.isLoading = false;
    //     this.selected = this.heroes[0];
    //   }
    // });
  }

  onDeleteHero(heroes: Hero[]) {
    this.heroes = heroes;
  }

  onSelectedHero(hero: Hero) {
    this.selected = hero;
  }

  goBack() {
    this.location.back();
  }

  addHero() {
    if (this.heroForm.invalid) {
      return;
    }
    this.isCreating = true;
    const hero = new Hero({
      name: this.heroForm.value.name,
      heroClass: this.heroForm.value.heroClass,
      attack: this.heroForm.value.attack,
      defense: this.heroForm.value.defense,
    }
    );

    this.heroService.addHero(hero, this.heroForm.value.image).subscribe(result => {
      this.isCreating = false;
      this.heroForm.reset();
      this.imagePreview = "";
      this.getHeroes();
      // this.heroForm.patchValue({ image: null });
      // this.heroForm.get('image').updateValueAndValidity();
    })
    // this.heroService.addHero()
    // name = name.trim();
    // if (!name) {
    //   return;
    // }

    // this.heroService.addHero({ name } as Hero).subscribe(hero => {
    //   this.heroes.push(hero);
    //   this.isLoading = false;
    // });
  }

  onImagePicked(event: Event) {
    //get file from change and set it to imagePath
    const file = (event.target as HTMLInputElement).files[0];
    // console.log(file);
    this.heroForm.patchValue({ image: file });
    this.heroForm.get('image').updateValueAndValidity();

    // image preview
    const fileRender = new FileReader();
    fileRender.readAsDataURL(file);
    fileRender.onload = () => {
      this.imagePreview = fileRender.result.toString();
    }
  }
}
