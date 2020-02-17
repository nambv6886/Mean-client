import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Hero } from '../../../hero/hero.model';
import { HeroService } from '../../../hero/hero.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-seach',
  templateUrl: './seach.component.html',
  styleUrls: ['./seach.component.css']
})
export class SeachComponent implements OnInit {
  searchForm = new FormGroup({
    name: new FormControl('')
  });

  heroes: Hero[] = [];
  found = false;
  private searchTerm = new Subject<string>();
  constructor(
    private heroService: HeroService) { }

  ngOnInit() {
      this.searchTerm.pipe(
      // wait 1s after each keystroke
      debounceTime(1000),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHero(term))
    ).subscribe(result => {
      this.heroes = result;
      this.found = true;
    });
  }

  search(term: string) {
    if (!term) {
      return;
    }
    this.searchTerm.next(term);
  }


  // testing reactive form
  onSubmit() {
    const data = this.searchForm.value;
  }
}
