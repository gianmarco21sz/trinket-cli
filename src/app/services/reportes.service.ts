import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientesRegistrados, IngresosMes, ProductosVendidos, VentasPorMes, VentasRealizadas } from '../models/reportes';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  headers = new HttpHeaders().set("Content-Type", "application/json");
  url = environment.uri + "reportes/";

  constructor(private http: HttpClient) { }

  clientesRegistrados(): Observable<ClientesRegistrados> {
    return this.http.get<ClientesRegistrados>(this.url + 'clientesRegistrados', { headers: this.headers });
  }

  ventasRealizadas(): Observable<VentasRealizadas> {
    return this.http.get<VentasRealizadas>(this.url + 'ventasRealizadas', { headers: this.headers });
  }

  ingresosMes(): Observable<IngresosMes> {
    return this.http.get<IngresosMes>(this.url + 'ingresosMes', { headers: this.headers });
  }

  //////////////////////////////

  productosVendidos(): Observable<ProductosVendidos[]> {
    return this.http.get<ProductosVendidos[]>(this.url + 'productosVendidos', { headers: this.headers });
  }

  ventasPorMes(): Observable<VentasPorMes[]> {
    return this.http.get<VentasPorMes[]>(this.url + 'ventasPorMes', { headers: this.headers });
  }
}
