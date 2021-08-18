import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Processor} from '../../../objects/Processor';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tesztinput',
  templateUrl: './CPUDataTable.component.html',
  styleUrls: ['./CPUDataTable.component.css']
})
export class CPUDataTableComponent implements OnInit {

  dataSource: MatTableDataSource<Processor>;

  displayedColumns = ['manufacturer', 'series', 'modelName', 'cheapestShop', 'cheapestPrice', 'lastUpdated'];
  manufacturer: string;
  series: string;


  constructor(private productService: ProductService,
              private dialogRef: MatDialogRef<CPUDataTableComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.manufacturer = data.manufacturer;
    this.series = data.series;
  }

  ngOnInit() {
    this.productService.getCPUs(this.manufacturer, this.series).subscribe(data => this.dataSource = new MatTableDataSource<Processor>(data));
  }

  onRowClicked(row: Processor) {
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
