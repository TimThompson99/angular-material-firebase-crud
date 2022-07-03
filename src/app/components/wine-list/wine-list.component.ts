import { Wine } from '../../shared/wine';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WineService } from '../../shared/wine.service';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css'],
})
export class WineListComponent {
  dataSource: MatTableDataSource<Wine>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  BookData: any = [];
  displayedColumns: any[] = [
    '$key',
    'book_name',
    'author_name',
    'publication_date',
    'in_stock',
    'action',
  ];

  constructor(private wineApi: WineService) {
    this.wineApi
      .GetBookList()
      .snapshotChanges()
      .subscribe((books) => {
        books.forEach((item) => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.BookData.push(a as Wine);
        });
        /* Data table */
        this.dataSource = new MatTableDataSource(this.BookData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
  }

  /* Delete */
  deleteBook(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.wineApi.DeleteBook(e.$key);
    }
  }
}
