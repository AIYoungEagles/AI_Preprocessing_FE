import {RouterModule, Routes} from '@angular/router';
import {UploadComponent} from './upload/upload.component';
import {ReviewComponent} from './review/review.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  { path: '', component: UploadComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'review', component: ReviewComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

