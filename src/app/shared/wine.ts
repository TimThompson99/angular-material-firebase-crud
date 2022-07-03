export interface Wine {
  $key: string;
  supplier_name: string;
  product_name: string;
  cases: number
  bottles_per_case: number;
  cost_per_case: number
  cost_per_bottle: number;
  retail_cost_per_case: number;
  retail_cost_per_bottle: number;
  rating_type: string,  
  available: string;
}
