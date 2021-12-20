
export interface RespuestaModelo {
  ProcesoExitoso: boolean;
  NumeroError: number;
  MensajeError: string;
  DetalleError: string;
  Respuesta: any[];
}

export interface ObjetoClientes
{
   ModeloObjetoClientes : Cliente[],
   seguro: any[];
}

export interface Cliente {
  cedula: string,
  nombres: number,
  apellidos: number,
  telefono: string,
  
}


