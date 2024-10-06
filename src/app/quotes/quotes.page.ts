import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

interface CryptoQuote {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

@Component({
  selector: 'app-quotes',
  templateUrl: 'quotes.page.html',
  styleUrls: ['quotes.page.scss']
})
export class QuotesPage implements OnInit {
  quotes: CryptoQuote[] = [];
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getQuotes();
  }

  async getQuotes() {
    const loading = await this.loadingController.create({
      message: 'Carregando cotações...'
    });
    await loading.present();

    this.http.get<CryptoQuote[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .subscribe({
        next: (data) => {
          this.quotes = data;
          this.error = null;
        },
        error: (error) => {
          console.error('Erro ao buscar cotações:', error);
          this.error = 'Não foi possível carregar as cotações. Por favor, tente novamente mais tarde.';
        },
        complete: () => {
          loading.dismiss();
        }
      });
  }

  async refreshQuotes(event: any) {
    await this.getQuotes();
    event.target.complete();
  }
}