import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hc-input-password-example',
  templateUrl: './input-password-example.component.html',
  styleUrls: ['./input-password-example.component.scss']
})
export class InputPasswordExampleComponent implements OnInit {

  hiddenEye = false;
  private pass: HTMLElement;

  constructor() { }

  ngOnInit() {
  }

  togglePassword() {
    this.hiddenEye = !this.hiddenEye;
    this.pass = document.getElementById("password") as HTMLElement;
    if (this.hiddenEye) {
      this.pass.setAttribute("type", "text");
    } else {
      this.pass.setAttribute("type", "password");
    }

  }

}
