import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Certifique-se que está aqui
import { CalculatorPage } from './calculator.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CalculatorPageRoutingModule } from './calculator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Importação do IonicModule para usar os componentes do Ionic
    ExploreContainerComponentModule,
    CalculatorPageRoutingModule
  ],
  declarations: [CalculatorPage]
})
export class CalculatorPageModule {}
