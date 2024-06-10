import { Injectable, inject, signal, Pipe } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, share, shareReplay, tap, throwError } from 'rxjs';
import { Item } from '../moduleItem/interface/Item';


interface Ites {
    content: Item[],
    totalPages: number;
    
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {



}


