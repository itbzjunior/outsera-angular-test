import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, signal, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {

  // Titulo da pagina
  title = 'Outsera Angular Test - Golden Raspberry Awards';

  // Itens do menu lateral, para usar no loop @for
  navItems = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      link: '/',
    },
    {
      title: 'Movie List',
      icon: 'list',
      link: '/movies',
    }
  ];

  // Variaveis para controle do MatSidenavModule no Mobile
  protected readonly isMobile = signal(true);
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    // Adiciona o check mobile para responsividade do menu em 600px. Abaixo disso, o menu é automaticamente fechado, só sendo possível abri-lo ao clicar no botão do cabeçalho
    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  /**
   * Lifecycle: Ao Destruir a Página
   */
  ngOnDestroy(): void {
    // Remove o evento "change" do mobile
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
