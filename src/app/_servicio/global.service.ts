import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  ruta_api = 'https://insurance20211220115512.azurewebsites.net/api';

  constructor() { }
}
