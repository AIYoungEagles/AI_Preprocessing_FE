import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatList, MatListItem} from '@angular/material/list';
import {HttpClient} from '@angular/common/http';
import {MatFormField} from '@angular/material/input';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatOption, MatOptionModule} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

interface UploadFileEntry {
  file: File;
  selectedType: 'PRIOR_AUTH' | 'ELIGIBILITY_CHECK' | 'COVERAGE_VALIDATION' | null;
}


@Component({
  selector: 'app-upload',
  imports: [
    MatIcon,
    NgForOf,
    MatButton,
    MatList,
    MatListItem,
    NgIf,
    MatFormField,
    MatSelect,
    MatOption,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  files: UploadFileEntry[] = [];
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  isDraggingOver = false;

  constructor(private router: Router, private http: HttpClient) {
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles: UploadFileEntry[] = Array.from(input.files).map(file => ({
        file,
        selectedType: null
      }));
      this.files.push(...newFiles);
    }
    console.log(this.files);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingOver = false;

    if (event.dataTransfer?.files) {
      const droppedFiles = Array.from(event.dataTransfer.files).map(file => ({
        file,
        selectedType: null // Initially unselected
      }));
      this.files.push(...droppedFiles);
    }
  }


  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDragLeave() {
    this.isDraggingOver = false;
  }

  getFileIcon(file: File): string {
    const ext = file.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'doc':
      case 'docx':
        return 'description';
      default:
        return 'insert_drive_file';
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  allTypesSelected(): boolean {
    return this.files.length > 0 && this.files.every(f => !!f.selectedType);
  }

  extractData() {
    // For POC: generate mock data for each uploaded file
    const mockDocuments = this.files.map((file, i) => ({
      title: file.file.name,
      patientId: Math.floor(Math.random() * 90000 + 10000).toString(),
      otherField: 'Editable field ' + (i + 1),
    }));

    // Ideally this should go to a shared service or be passed via router state
    sessionStorage.setItem('mockDocuments', JSON.stringify(mockDocuments));
    this.router.navigate(['/review']);
  }

  extractDataDev() {
    if (!this.files.length) return;

    const formData = new FormData();
    this.files.forEach(file => formData.append('documents', file.file, file.file.name));

    this.http.post('/api/document/upload', formData).subscribe({
      next: (response: any) => {
        this.router.navigate(['/review'], { state: { extractedDocuments: response } });
      },
      error: (error) => {
        console.error('Extraction failed:', error);
      }
    });
  }
}
