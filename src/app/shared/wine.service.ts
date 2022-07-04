import { Injectable } from '@angular/core';
import { Wine } from './wine';


import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';



@Injectable({
  providedIn: 'root',
})
export class WineService {
  winesRef: AngularFireList<any>;
  wineRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  /* Add Wine */
  AddWine(wine: Wine) {
    this.winesRef
      .push({
        supplier_name: wine.supplier_name,
        product_name: wine.product_name,
        cases: wine.cases,
        bottles_per_case: wine.bottles_per_case,
        cost_per_case: wine.cost_per_case,
        cost_per_bottle: wine.cost_per_bottle,
        retail_cost_per_case: wine.retail_cost_per_case,
        retail_cost_per_bottle: wine.cost_per_bottle,
        rating_type: wine.rating_type,        
        available: wine.available
      })    
      .catch((error) => {
        this.errorMgmt(error);
      });
  }

  /* Get Wine */
  GetWine(id: string) {
    this.wineRef = this.db.object('wine-list/' + id);
    return this.wineRef;
  }

  /* Get Wine list */
  GetWineList() {
    this.winesRef = this.db.list('wine-list');
    return this.winesRef;
  }

  /* Update Wine */
  UpdateWine(id, wine: Wine) {
    this.wineRef
      .update({
        supplier_name: wine.supplier_name,
        product_name: wine.product_name,
        cases: wine.cases,
        bottles_per_case: wine.bottles_per_case,
        cost_per_case: wine.cost_per_case,
        cost_per_bottle: wine.cost_per_bottle,
        retail_cost_per_case: wine.retail_cost_per_case,
        retail_cost_per_bottle: wine.retail_cost_per_bottle,
        rating_type: wine.rating_type,
        available: wine.available
      })
      .catch((error) => {
        this.errorMgmt(error);
      });
  }

  /* Delete book */
  DeleteWine(id: string) {
    this.wineRef = this.db.object('wine-list/' + id);
    this.wineRef.remove().catch((error) => {
      this.errorMgmt(error);
    });
  }

  // Error management
  private errorMgmt(error) {
    console.log(error);
  }
}
