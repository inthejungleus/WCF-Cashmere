import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IUser} from '@wcf-insurance/cashmere';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'hc-sidenav-demo',
    templateUrl: 'sidenav-demo.component.html',
    styleUrls: ['sidenav-demo.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidenavDemoComponent implements OnInit {
    mobileView = false;
    user: IUser | null = {
        name: 'John Doe',
        // avatar: '/src/assets/avatar.jpg'
    };

    userName = new FormControl(this.user ? this.user.name : '');
    showSignIn = new FormControl(true);
    showManageMyPolicy = new FormControl(false);
    userMenuLinks = new FormControl(true);

    dummyContent: string[] = [];

    // variable to allow us to simulate a link be added later
    // based on an API call or something
    showActiveLink = false;
    showActiveLinkLater = false;

    constructor(public breakpointObserver: BreakpointObserver) {
    }

    ngOnInit() {
        this.breakpointObserver
            .observe(['(max-width: 768px)'])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.mobileView = true;
                    console.log('Viewport is 768px or under!');
                } else {
                    this.mobileView = false;
                    console.log('Viewport is getting bigger!');
                }
            });

        // simulate the result of a network request causing
        // a new link to be displayed in the sidenav
        setTimeout(() => {
            this.showActiveLink = true;
        }, 2000);
        setTimeout(() => {
            this.showActiveLinkLater = true;
        }, 4000);
    }

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
