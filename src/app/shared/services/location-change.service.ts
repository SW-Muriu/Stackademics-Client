import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationChangeService {
  private rowData$: WritableSignal<any> = signal(null);

  setRowData(data: any): void {
    this.rowData$.set(data);
  }

  getRowData(): any {
    return this.rowData$();
  }
}
