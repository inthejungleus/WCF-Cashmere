import {Component} from '@angular/core';
import {IUser} from '@wcf-insurance/cashmere';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'hc-header-demo',
    templateUrl: 'header-demo.component.html',
    styleUrls: ['header-demo.component.scss']
})
export class HeaderDemoComponent {
    user: IUser|null = {
        name: 'John Doe',
        // avatar: '/src/assets/avatar.jpg'
    };

    userName = new FormControl(this.user ? this.user.name : '');
    showSignIn = new FormControl(true);
    showManageMyPolicy = new FormControl(false);
    userMenuLinks = new FormControl(true);

    dummyContent: string[] = [];

    addDummyContent() {
        for (let i = 0; i < 50; i++) {
            this.dummyContent.push(`Content ${i + 1}`);
        }
    }

    removeDummyContent() {
        this.dummyContent = [];
    }

    changeUsername() {
        if (this.userName.value) {
            this.user = {
                name: this.userName.value
            };
        } else {
            this.user = null;
        }
    }
}
