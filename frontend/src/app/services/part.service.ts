import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Part {
    _id: string;
    name: string;
    quantity: number;
    minLevel: number;
    unitPrice: number;
    createdAt: string;
    updatedAt: string;
}

export interface DashboardSummary {
    totalParts: number;
    lowStockCount: number;
    totalInventoryValue: number;
}

export interface StockMovement {
    _id: string;
    partId: string;
    partName: string;
    action: 'Added' | 'Removed';
    quantity: number;
    reason: string;
    date: string;
    createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class PartService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getParts(): Observable<Part[]> {
        return this.http.get<Part[]>(`${this.baseUrl}/parts`);
    }

    addPart(part: { name: string; quantity: number; minLevel: number; unitPrice: number }): Observable<Part> {
        return this.http.post<Part>(`${this.baseUrl}/parts`, part);
    }

    addStock(partId: string, quantity: number): Observable<any> {
        return this.http.patch(`${this.baseUrl}/stock/${partId}/add`, { quantity });
    }

    removeStock(partId: string, quantity: number, reason: string): Observable<any> {
        return this.http.patch(`${this.baseUrl}/stock/${partId}/remove`, { quantity, reason });
    }

    getDashboard(): Observable<DashboardSummary> {
        return this.http.get<DashboardSummary>(`${this.baseUrl}/dashboard`);
    }

    getHistory(): Observable<StockMovement[]> {
        return this.http.get<StockMovement[]>(`${this.baseUrl}/stock/history/latest`);
    }
}
