import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router"
import { RespuestaModelo } from '../_modelo/interfaz.service';
import { ClienteService } from '../_servicio/cliente.service';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})

export class PrincipalComponent implements OnInit {
  @ViewChild('valor_input', null) valor_input: ElementRef;
  @ViewChild('matDialogResultado', null) matDialogResultado: ElementRef;
 
  constructor(private router: Router, private scliente: ClienteService, public dialog: MatDialog) { }

  public label_input: string;
  public tipo: string = "cedula";
 
  ngOnInit() {

     
    var btnTypes = document.querySelectorAll('.travel-type-wrap .item');

    for (let i = 0; i < btnTypes.length; i++) {
      btnTypes[i].addEventListener('click', function () {
        for (let i = 0; i < btnTypes.length; i++) {
          btnTypes[i].classList.remove('active')
        }
        btnTypes[i].classList.add('active')
      })
    }
    this.TipoBusqueda('cedula');
  }

  TipoBusqueda(valor: string) {
    this.valor_input.nativeElement.value = "";
     if (valor == "cedula") {
      this.label_input = "Ingrese el número de cédula";
      this.tipo = "cedula";
    }
    if (valor == "seguro") {
      this.label_input = "Ingrese el número de seguro";
      this.tipo = "seguro";

    }

  }

  Carga() {
    this.router.navigate(['/carga']);

  }

  Buscar(){
    console.log(this.valor_input.nativeElement.value, this.tipo);
    if(this.tipo == "cedula"){
      this.BuscarPorCedula(this.valor_input.nativeElement.value);
    }

    if(this.tipo == "seguro"){
      this.BuscarPorSeguro(this.valor_input.nativeElement.value);
    }
 
    
  }

  consultarClientes() {
     this.scliente.ConsultaClientes()
      .subscribe(
        (dato: RespuestaModelo) => {
          if (dato.ProcesoExitoso == true) {
         
            console.log(dato.Respuesta);

          }

        });
  }

  BuscarPorCedula(cedula) {
    console.log(12346);
    this.scliente.BuscarPorCedula(cedula)
      .subscribe(
        (dato: RespuestaModelo) => {
          if (dato.ProcesoExitoso == true) {
          
            this.openDialog(dato.Respuesta, 'cedula');
          }

        });
  }

  BuscarPorSeguro(seguro) {
    this.scliente.BuscarPorSeguro(seguro)
      .subscribe(
        (dato: RespuestaModelo) => {
          if (dato.ProcesoExitoso == true) {
          
            this.openDialog(dato.Respuesta,'seguro');
          }

        });
  }

  openDialog(resultado, tipo) {
  
    const dialogRef = this.dialog.open(DialogContentResultado, {
      width: '500px',
      data: {resultado: resultado, tipo: tipo },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-resultado',
  templateUrl: 'dialog-content-resultado.html',
})
export class DialogContentResultado {
  public resultado: any;
  public verCedula: boolean;
  public verSeguro: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogContentResultado>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.resultado = this.data.resultado[0];
    if(this.data.tipo == 'cedula'){
      this.verCedula = true;
      this.verSeguro = !this.verCedula;

    }

    if(this.data.tipo == 'seguro'){
      this.verSeguro = true;
      this.verCedula = !this.verSeguro;


    }
    console.log(12, this.data.tipo);


  }
}

