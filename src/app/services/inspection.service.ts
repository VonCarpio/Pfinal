import { Injectable } from '@angular/core';
import { Inspection } from '../models/inspection.model';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private inspections: Inspection[] = [];

  addInspection(inspection: Inspection) {
    this.inspections.push(inspection);
  }

  getInspections(): Inspection[] {
    return this.inspections;
  }

  exportToJson(): Blob {
    const jsonData = JSON.stringify(this.inspections, null, 2);
    return new Blob([jsonData], { type: 'application/json' });
  }
}
