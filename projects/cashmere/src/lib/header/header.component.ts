import {Component, Input} from '@angular/core';
import {IUser} from '../sidenav';

@Component({
    selector: 'hc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    /** Display name of current user */
    @Input()
    user: IUser | null = null;

    /** Url to brand icon image file */
    @Input()
    brandIcon: string = 'https://www.wcf.com/wcf-ui/common/images/WCF-Logo.svg';

    /** Router link triggered when home icon is clicked */
    @Input()
    homeUri: any[] | string = location.origin;

    /** Base URL to be used for logging in */
    @Input()
    loginUrl: string = '/login';

    /** Base URL to be used for logging out */
    @Input()
    logoutUrl: string = '/logout';

    /** Whether the logout url should append on a parameter to the current page. Default true */
    @Input()
    logoutReturnToCurrent: boolean = true;

    /** Whether the Sign In link should show in the header when a valid user is not already signed in. Default false */
    @Input()
    showSignIn: boolean = false;

    _logout() {
        let url = this.logoutUrl;
        if (this.logoutReturnToCurrent) {
            url += `?service=${window.location.href}`;
        }
        window.location.href = url;
    }

    _login() {
        window.location.href = `${this.loginUrl}?service=${window.location.href}`;
    }

    homeUriIsRelative() {
        if (typeof this.homeUri !== 'string') {
            return true;
        }
        return !this.homeUri.startsWith('http');
    }
}
