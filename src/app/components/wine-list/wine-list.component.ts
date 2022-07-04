import { Wine } from '../../shared/wine';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WineService } from '../../shared/wine.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css'],
})
export class WineListComponent implements OnInit {
  dataSource: MatTableDataSource<Wine>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  WineData: any = [];
  displayedColumns: any[] = [
    '$key',
    'supplier_name',
    'product_name',
    'cases',
    'bottles_per_case',
    'retail_cost_per_case',
    'retail_cost_per_bottle',
    'rating_type',
    'available',
    'action'
  ];
  userDetails: any;
  isAdmin: boolean;
  showLoading: boolean = true;

  constructor(private wineApi: WineService, private authService: AuthService) {
    this.wineApi
      .GetWineList()
      .snapshotChanges()
      .subscribe((wines) => {
        wines.forEach((item) => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.WineData.push(a as Wine);
        });
        /* Data table */
        this.dataSource = new MatTableDataSource(this.WineData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
  }

  ngOnInit() {
    this.authService.currentUserDetails.subscribe(user => {
      this.userDetails = user;
      if (user) {
        this.showLoading = false;
      }
    })
  }  

  /* Delete */
  deleteWine(index: number, e) {
    if (this.userDetails) {
      if (window.confirm('Are you sure?')) {
        const data = this.dataSource.data;
        data.splice(
          this.paginator.pageIndex * this.paginator.pageSize + index,
          1
        );
        this.dataSource.data = data;
        this.wineApi.DeleteWine(e.$key);
      }
    }
  }
}
