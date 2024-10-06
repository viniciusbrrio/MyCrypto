import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuotesPage } from './quotes.page';
import { QuotesPageRoutingModule } from './quotes-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QuotesPageRoutingModule,
    HttpClientModule
  ],
  declarations: [QuotesPage]
})
export class QuotesPageModule {}