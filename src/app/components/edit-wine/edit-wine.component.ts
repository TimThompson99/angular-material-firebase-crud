import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { WineService } from '../../shared/wine.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-edit-wine',
  templateUrl: './edit-wine.component.html',
  styleUrls: ['./edit-wine.component.css'],
})
export class EditWineComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editWineForm: FormGroup;
  RatingType: any = [
    'Red Solo Cup With Ice',
    'Budget Balla',
    'Hidden Gem',
    'It\'s A Talker',
    'Todd Approved',
    'Two Pinkys Up'
  ];

  ngOnInit() {
    const validPath = this.actRoute.snapshot.paramMap.get('id');
    if (validPath !== undefined) {
      this.updateWineForm();
    } else {
      this.router.navigate(['wine-list']);
    }
  }

  constructor(
    public fb: FormBuilder,
    private location: Location,
    private wineApi: WineService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.wineApi
      .GetWine(id)
      .valueChanges()
      .subscribe((data) => {
        this.languageArray = data.languages;
        this.editWineForm.setValue(data);
      });
  }

  /* Update form */
  updateWineForm() {
    this.editWineForm = this.fb.group({
      supplier_name: ['', [Validators.required]],
      product_name: ['', [Validators.required]],
      cases: ['', [Validators.required]],
      bottles_per_case: ['', [Validators.required]],
      cost_per_case: ['', [Validators.required]],
      cost_per_bottle: ['', [Validators.required]],
      retail_cost_per_case: ['', [Validators.required]],
      retail_cost_per_bottle: ['', [Validators.required]],  
      rating_type: [''], 
      available: ['Yes']
    });
  }

  /* Add language */
  add(event: MatChipInputEvent): void {
    var input: any = event.input;
    var value: any = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove language */
  remove(language: any): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editWineForm.controls[controlName].hasError(errorName);
  };

  /* Go to previous page */
  goBack() {
    this.location.back();
  }

  /* Submit book */
  updateWine() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you wanna update?')) {
      this.wineApi.UpdateWine(id, this.editWineForm.value);
      this.router.navigate(['wine-list']);
    }
  }
}
