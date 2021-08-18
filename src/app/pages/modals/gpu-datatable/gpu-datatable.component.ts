import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Processor} from '../../../objects/Processor';
import {ProductService} from '../../../services/product.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GPU} from '../../../objects/GPU';

@Component({
  selector: 'app-gpu-datatable',
  templateUrl: './gpu-datatable.component.html',
  styleUrls: ['./gpu-datatable.component.css']
})
export class GpuDatatableComponent implements OnInit {

  dataSource: MatTableDataSource<Processor>;

  displayedColumns = ['manufacturer', 'series', 'modelName', 'cheapestShop', 'cheapestPrice', 'lastUpdated'];
  manufacturer: string;
  series: string;


  constructor(private productService: ProductService,
              private dialogRef: MatDialogRef<GpuDatatableComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.manufacturer = data.manufacturer;
    this.series = data.series;
  }

  ngOnInit() {
    this.productService.getGPUs(this.manufacturer, this.series)
      .subscribe(data => this.dataSource = new MatTableDataSource<GPU>(data));
  }

  onRowClicked(row: GPU) {
    this.dialogRef.close(row);
  }

  close() {
    this.dialogRef.close();
  }


  applyFilter(filterValue: any) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
