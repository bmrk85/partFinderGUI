import {Component, OnInit} from '@angular/core';
import {CPUDataTableComponent} from '../modals/cpu-datatable/CPUDataTable.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Processor} from '../../objects/Processor';
import {GPU} from '../../objects/GPU';
import {GpuDatatableComponent} from '../modals/gpu-datatable/gpu-datatable.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  chosenCpu: Processor;
  chosenGPU: GPU;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.chosenCpu = {};
    this.chosenGPU = {};

  }

  openDialog(passedManufacturer: string, passedType: string, passedSeries: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      manufacturer: passedManufacturer,
      series: passedSeries
    };

    if (passedType === 'cpu') {
      const dialogRef = this.dialog.open(CPUDataTableComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        data !== undefined ? this.chosenCpu = data : console.log('semmi');
      });
    } else if (passedType === 'gpu') {
      const dialogRef = this.dialog.open(GpuDatatableComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        data !== undefined ? this.chosenGPU = data : console.log('semmi');
      });
    }
  }


  changeCpuManufacturer(innerText: any) {
    console.log(innerText);
    this.chosenCpu = {
      manufacturer: innerText
    };
  }

  changeCpuSeries(innerText: any) {
    this.chosenCpu = {
      manufacturer: this.chosenCpu.manufacturer,
      series: innerText
    };
  }

  changeGpuManufacturer(innerText: any) {
    this.chosenGPU = {
      manufacturer: innerText
    };
  }

  changeGpuSeries(innerText: any) {
    this.chosenGPU = {
      manufacturer: this.chosenGPU.manufacturer,
      series: innerText
    };
  }

}

