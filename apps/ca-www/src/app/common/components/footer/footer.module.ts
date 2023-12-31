import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, RouterModule.forChild([]), TranslateModule],
  exports: [FooterComponent]
})
export class FooterModule {}
