import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Producto } from '../interfaces/producto.interface';
import { throwIfEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrad: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();

  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-c93d4-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: any) => {
          this.productos = resp
          console.log(resp);
          this.cargando = false;
          resolve;

        });
    });


  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-c93d4-default-rtdb.firebaseio.com/productos/${id}.json`);

  }

  buscarProdcuto(termino: string) {

    if (this.productos.length === 0 ){
      //cargar productos
      this.cargarProductos().then(()=>{
        //ejecuta despues de los productos
        //aplica filtro
        this.filtrarProdcutis(termino);
      });
    }else{
      //aplicar el filtro
      this.filtrarProdcutis(termino);
    }
  }

  private filtrarProdcutis (termino:string){
    this.productosFiltrad=[];
    termino = termino.toLocaleLowerCase();



    this.productos.forEach(prod =>{
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrad.push(prod);

      }
    })
  }

}
