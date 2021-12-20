import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaComponent } from './carga/carga.component';
import { PrincipalComponent } from './principal/principal.component';



const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    data: { titulo: 'Seguros', subtitulo: 'Búsqueda de Seguros' },
    children: [


    ],

  },

  {
    path: 'carga',
    component: CargaComponent,
    data: { titulo: 'Datos Catálogo', subtitulo: 'Crear o modificar datos de parametrización, datos Básicos, Correo, Oficio' },
  },
   

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
