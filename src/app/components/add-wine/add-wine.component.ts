import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { WineService } from '../../shared/wine.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-wine',
  templateUrl: './add-wine.component.html',
  styleUrls: ['./add-wine.component.css'],
})
export class AddWineComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  @ViewChild('resetBookForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  wineForm: FormGroup;
  RatingType: any = [
    'Red Solo Cup With Ice',
    'Budget Balla',
    'Hidden Gem',
    'It\'s A Talker',
    'Todd Approved',
    'Two Pinkys Up'
  ];

  ngOnInit() {
    this.wineApi.GetWineList();
    this.submitBookForm();
  }

  constructor(public fb: FormBuilder, private wineApi: WineService) {}

  /* Remove dynamic languages */
  remove(language: Language): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }

  /* Reactive book form */
  submitBookForm() {
    this.wineForm = this.fb.group({ 
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

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.wineForm.controls[controlName].hasError(errorName);
  };

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Reset form */
  resetForm() {
    this.languageArray = [];
    this.wineForm.reset();
    Object.keys(this.wineForm.controls).forEach((key) => {
      this.wineForm.controls[key].setErrors(null);
    });
  }

  /* Submit book */
  submitBook() {
    if (this.wineForm.valid) {
      this.wineApi.AddWine(this.wineForm.value);
      this.resetForm();
    }
  }
}
