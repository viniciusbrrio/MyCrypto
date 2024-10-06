import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';

interface CurrencyOption {
  code: string;
  name: string;
}

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.page.html',
  styleUrls: ['calculator.page.scss']
})
export class CalculatorPage {
  amount: number | null = null;
  fromCurrency: string = 'USD';
  toCrypto: string = 'bitcoin';
  result: number | null = null;

  isLoading: boolean = false;

  fiatCurrencies: CurrencyOption[] = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'BRL', name: 'Brazilian Real' }
  ];

  cryptoCurrencies: CurrencyOption[] = [
    { code: 'bitcoin', name: 'Bitcoin' },
    { code: 'ethereum', name: 'Ethereum' },
    { code: 'ripple', name: 'XRP' },
    { code: 'cardano', name: 'Cardano' },
    { code: 'dogecoin', name: 'Dogecoin' }
  ];

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async calculate() {
    if (!this.amount || this.amount <= 0) {
      this.showToast('Por favor, insira um valor válido.');
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Calculando...'
    });
    await loading.present();

    this.http.get(`https://api.coingecko.com/api/v3/simple/price?ids=${this.toCrypto}&vs_currencies=${this.fromCurrency.toLowerCase()}`)
      .subscribe({
        next: (data: any) => {
          if (data && data[this.toCrypto] && data[this.toCrypto][this.fromCurrency.toLowerCase()]) {
            const rate = data[this.toCrypto][this.fromCurrency.toLowerCase()];
        
            if (rate && this.amount) {  // Garantir que rate e amount não são nulos ou indefinidos
              this.result = this.amount / rate;
            } else {
              this.showToast('Valor ou taxa de câmbio inválidos. Por favor, tente novamente.');
            }
          } else {
            this.showToast('Não foi possível obter a taxa de câmbio. Verifique as moedas selecionadas.');
          }
        },
        error: (error) => {
          console.error('Erro ao buscar taxa de câmbio:', error);
          this.showToast('Erro ao calcular. Por favor, tente novamente mais tarde.');
        },
        complete: () => {
          this.isLoading = false;
          loading.dismiss();
        }
      });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
