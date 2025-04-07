import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private secretKey: string = environment.secretKey;

  constructor() {}

  setItem(key: string, value: any): void {
    localStorage.removeItem(key);
    const encryptedValue: string = this.encrypt(value);
    localStorage.setItem(key, encryptedValue);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  getItem(key: string): any {
    const encryptedValue: string | null = localStorage.getItem(key);
    return encryptedValue ? this.decrypt(encryptedValue) : null;
  }

  private encrypt(value: any): string {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      this.secretKey
    ).toString();
  }

  private decrypt(encryptedValue: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
    const decryptedValue: string = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue ? JSON.parse(decryptedValue) : null;
  }
}
