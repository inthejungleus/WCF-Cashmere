import {Component} from '@angular/core';
import {IUser} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-header-demo',
    templateUrl: 'header-demo.component.html',
    styleUrls: ['header-demo.component.scss']
})
export class HeaderDemoComponent {
    user: IUser = {
        name: 'John Doe',
        // avatar: '/src/assets/avatar.jpg'
    };

    dummyContent: string[] = [];

    addDummyContent() {
        for (let i = 0; i < 50; i++) {
            this.dummyContent.push(`Content ${i + 1}`);
        }
    }

    removeDummyContent() {
        this.dummyContent = [];
    }
}
