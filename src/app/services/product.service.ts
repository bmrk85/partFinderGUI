import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseForProduct} from '../objects/ResponseForProduct';
import {Processor} from '../objects/Processor';
import {GPU} from '../objects/GPU';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private client: HttpClient) {
  }

  rootURL = 'http://localhost:8080/api';

  getProduct(productName): Observable<ResponseForProduct> {
    return this.client.post(this.rootURL + '/' + productName, null);
  }

  getCPUs(manufacturer: string, series: string): Observable<Processor[]> {
    return this.client.get<Processor[]>(this.rootURL + '/cpu/' + manufacturer + '/' + series.toUpperCase());
  }

  getGPUs(manufacturer: string, series: string): Observable<GPU[]> {
    return this.client.get<GPU[]>(this.rootURL + '/gpu/' + manufacturer + '/' + series.toUpperCase());
  }

}
