import { JsonPipe } from '@angular/common';
import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  price = signal(0);
  shippingCosts = signal(3);
  total = computed(() => this.price() + this.shippingCosts());
  message = signal('');

  priceReadOnly = this.price.asReadonly();

  user = signal({
    name: 'Pepe',
    framework: 'Angular',
  });

  years = signal([1990, 1991, 2022]);

  constructor() {
    effect(() => console.log(JSON.stringify(this.user())));
  }
  ngOnInit(): void {}

  changePrice(): void {
    this.price.set(5);
  }

  incrementPrice(): void {
    this.price.update((currentValue) => currentValue + 1);
  }

  decrementPrice(): void {
    this.price.update((currentValue) => currentValue - 1);
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    this.price.set(Number(value));
    this.message.set(`El precio ha cambiado:  ${this.price()}`);
    // priceReadOnly no podríamos modificarlo porque es readonly
    //this.priceReadOnly.set(Number(value));
  }

  changeUserName(name: string): void {
    //this.user.update((user) => (user.name = 'nombre'));
  }
}
