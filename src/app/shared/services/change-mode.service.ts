import { inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ChangeModeService {
  private readonly THE_THEME = 'theme';

  constructor() {
    this.loadTheme();
  }

  setTheme(isDarkMode: boolean) {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem(this.THE_THEME, JSON.stringify(isDarkMode));
  }

  toggleTheme(): void {
    const isDarkMode = document.documentElement.classList.contains('dark');
    this.setTheme(!isDarkMode);
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem(this.THE_THEME);
    let isDarkMode: boolean;
    if (savedTheme !== null) {
      isDarkMode = JSON.parse(savedTheme);
    } else {
      isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    document.documentElement.classList.toggle('dark', isDarkMode);
  }
}