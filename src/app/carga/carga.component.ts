import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import { ClienteService } from '../_servicio/cliente.service';
import { Cliente, ObjetoClientes, RespuestaModelo } from '../_modelo/interfaz.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {
  title = 'XlsRead';
  file: File
  arrayBuffer: any
  filelist: any
  documentoCargado: boolean = false;
  seguros: any[];
  cantidadRegistros: any = 0;
  chkSeguros: any;
  ObjetoCliente: ObjetoClientes;
  cargando: boolean = true;
  textoCargado: string = "";
  constructor(private scliente: ClienteService) { }

  ngOnInit() {
    this.ConsultarSeguros();

  }
  ConsultarSeguros() {
    this.scliente.ConsultaSeguros()
      .subscribe(
        (dato: RespuestaModelo) => {
          if (dato.ProcesoExitoso == true) {

            this.seguros = dato.Respuesta[0];
            console.log(this.seguros);

          }

        });
  }

  SeleccionarSeguro($event) {
    console.log($event);
    this.chkSeguros = $event;
    if (this.cantidadRegistros == 0 || this.chkSeguros.lelength == 0) {
      this.cargando = true;
    } else {
      this.cargando = false;

    }
  }

  CargarClientes() {
    var temp;
    this.cargando = true;
    this.ObjetoCliente = { ModeloObjetoClientes: null, seguro: null };
    var arrTmp = new Array();
    var linea: Cliente = { cedula: null, nombres: null, apellidos: null, telefono: null };
    for (let i = 1; i < this.filelist.length; i++) {
      linea = { cedula: null, nombres: null, apellidos: null, telefono: null };
      temp = this.filelist[i];

      linea.cedula = temp.__EMPTY;
      linea.nombres = temp.__EMPTY_1;
      linea.apellidos = temp.__EMPTY_2;
      linea.telefono = temp.__EMPTY_3;



      arrTmp.push(linea);
    }
    this.ObjetoCliente.ModeloObjetoClientes = arrTmp;
    this.ObjetoCliente.seguro = this.chkSeguros;


    this.scliente.CargarClientes(this.ObjetoCliente)
      .subscribe(
        (dato: RespuestaModelo) => {
          if (dato.ProcesoExitoso == true) {
            this.documentoCargado = false;
            this.textoCargado = "Cargados correctamente";
          } else {
            this.textoCargado = "Error a cargar archivo";
          }
          this.cargando = false;


        },
        (error: any) => console.log('Error '),


      );

  }

  addfile(event) {
    this.textoCargado = "";

    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      //console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.filelist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.documentoCargado = true;
      this.cantidadRegistros = this.filelist.length;
      if (this.cantidadRegistros == 0 || this.chkSeguros.lelength == 0) {
        this.cargando = true;
      } else {
        this.cargando = false;

      }
    }


  }

}
