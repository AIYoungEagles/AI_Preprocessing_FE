import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatFormField, MatInput, MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

interface Field {
  name: string;
  value: string;
  isProtected: boolean;
  isConfident: boolean;
}

interface DocumentData {
  documentTitle: string;
  fields: Field[];
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    NgIf,
    MatNavList,
    MatListItem,
    MatInput,
    FormsModule,
    MatButton,
    NgForOf,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  documents: DocumentData[] = [];
  selectedIndex: number = 0;
  loading = true;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit1(): void {
    const navState = history.state;
    if (navState.extractedDocuments) {
      this.documents = navState.extractedDocuments;
    } else {
      console.warn('No document data provided. Redirecting...');
      this.router.navigate(['/upload']);
    }
    this.loading = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      // Replace with actual API call in real scenario
      this.documents = [
        {
          documentTitle: 'Doc1',
          fields: [
            {
              name: 'PatientId',
              value: 'xxxx123',
              isProtected: true,
              isConfident: true,
            },
            {
              name: 'Health Plan Name',
              value: 'Basisc',
              isProtected: false,
              isConfident: false,
            },
            {
              name: 'Credit Card',
              value: 'xxxxxxxxxxxxxxxx465',
              isProtected: true,
              isConfident: true,
            },
          ],
        },
        {
          documentTitle: 'Doc2',
          fields: [
            {
              name: 'PatientId',
              value: 'xxxx125',
              isProtected: true,
              isConfident: true,
            },
            {
              name: 'Health Plan Name',
              value: 'Basisc4',
              isProtected: false,
              isConfident: false,
            },
            {
              name: 'Credit Card',
              value: 'xxxxxxxxxxxxxxxx455',
              isProtected: true,
              isConfident: true,
            },
          ],
        },
        {
          documentTitle: 'Doc4',
          fields: [
            {
              name: 'PatientId',
              value: 'xxxx125',
              isProtected: true,
              isConfident: true,
            },
            {
              name: 'Health Plan Name',
              value: 'Basisc4',
              isProtected: false,
              isConfident: false,
            },
            {
              name: 'Credit Card',
              value: 'xxxxxxxxxxxxxxxx455',
              isProtected: true,
              isConfident: true,
            },
          ],
        },
        {
          documentTitle: 'Doc5',
          fields: [
            {
              name: 'PatientId',
              value: 'xxxx125',
              isProtected: true,
              isConfident: true,
            },
            {
              name: 'Health Plan Name',
              value: 'Basisc4',
              isProtected: false,
              isConfident: false,
            },
            {
              name: 'Credit Card',
              value: 'xxxxxxxxxxxxxxxx455',
              isProtected: true,
              isConfident: true,
            },
            {
              name: 'Health Plan Name',
              value: 'Basisc4',
              isProtected: false,
              isConfident: false,
            },
            {
              name: 'Credit Card',
              value: 'xxxxxxxxxxxxxxxx455',
              isProtected: true,
              isConfident: true,
            },
            {
              name: 'Health Plan Name',
              value: 'Basisc4',
              isProtected: false,
              isConfident: false,
            },
            {
              name: 'Credit Card',
              value: 'xxxxxxxxxxxxxxxx455',
              isProtected: true,
              isConfident: true,
            },
            {
              name: 'Health Plan Name',
              value: 'Basisc4',
              isProtected: false,
              isConfident: false,
            },
            {
              name: 'Credit Card',
              value: 'xxxxxxxxxxxxxxxx455',
              isProtected: true,
              isConfident: true,
            },

          ],
        }
      ];
      this.loading = false;
    }, 1500);
  }

  selectDoc(index: number) {
    this.selectedIndex = index;
  }

  removeDoc(index: number) {
    this.documents.splice(index, 1);
    if (this.selectedIndex >= this.documents.length) {
      this.selectedIndex = Math.max(0, this.documents.length - 1);
    }
  }

  submit() {
    console.log('Submitting documents:', this.documents);
    // Call your API here
  }

  submitDev() {
    this.http.post('/api/document/process', this.documents).subscribe({
      next: () => {
        this.router.navigate(['/upload']).then(() => {
          alert('Your documents were sent for further processing');
        });
      },
      error: (err) => {
        console.error('Document processing failed', err);
        alert('Failed to submit documents. Please try again.');
      }
    });
  }
}
