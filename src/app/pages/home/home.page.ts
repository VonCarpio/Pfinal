import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';
import { LocationService } from 'src/app/services/location.service';
import { InspectionService } from 'src/app/services/inspection.service';
import { Inspection } from 'src/app/models/inspection.model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  inspections: Inspection[] = [];
  isModalOpen = false;
  selectedImage: string | undefined;

  constructor(
    private cameraService: CameraService,
    private locationService: LocationService,
    private inspectionService: InspectionService
  ) {}

  ngOnInit() {
    this.inspections = this.inspectionService.getInspections();
  }

  async captureInspection() {
    const photo = await this.cameraService.takePhoto();
    const location = await this.locationService.getCurrentPosition();
    const comments = prompt('Escribe un comentario:') || 'Sin comentarios';

    const inspection: Inspection = {
      photo,
      location,
      timestamp: Date.now(),
      comments,
    };

    this.inspectionService.addInspection(inspection);
  }

  deleteInspection(index: number): void {
    this.inspectionService.deleteInspection(index);
    this.inspections = this.inspectionService.getInspections();
  }  

  exportInspections() {
    const jsonBlob = this.inspectionService.exportToJson();
    saveAs(jsonBlob, 'inspections.json');
  }

  openImageModal(imageUrl: string) {
    this.selectedImage = imageUrl;
    this.isModalOpen = true;
  }

  closeImageModal() {
    this.isModalOpen = false;
  }
}
