import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordEncryptionService {

  encryptPasswordToBase64(password: string): string {
    const textEncoder = new TextEncoder();
    const passwordBytes = textEncoder.encode(password);
    const base64Password = this.uint8ArrayToBase64(passwordBytes);
    return base64Password;
  }

  private uint8ArrayToBase64(uint8Array: Uint8Array): string {
    let binaryString = '';
    const bytes = new Uint8Array(uint8Array);
    for (let i = 0; i < bytes.byteLength; i++) {
      binaryString += String.fromCharCode(bytes[i]);
    }
    return btoa(binaryString);
  }
}
