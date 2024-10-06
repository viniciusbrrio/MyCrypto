import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'intro',
        loadChildren: () => import('../Intro/intro.module').then(m => m.IntroPageModule)
      },
      {
        path: 'calculator',
        loadChildren: () => import('../calculator/calculator.module').then(m => m.CalculatorPageModule)
      },
      {
        path: 'quotes',
        loadChildren: () => import('../quotes/quotes.module').then(m => m.QuotesPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/intro',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/intro',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
