import {Component, ElementRef, HostBinding, Input, ContentChildren, QueryList, Renderer2, ViewChild} from '@angular/core';

/** Primary navigation links */
@Component({
    selector: 'hc-sidenav-link',
    templateUrl: 'sidenav-link.component.html',
    styleUrls: ['sidenav-link.component.scss']
})
export class SidenavLinkComponent {
    /** RouterLink uri. See https://angular.io/api/router/RouterLink */
    @Input()
    routerLink?: string;

    /** RouterLink uri. See https://angular.io/api/router/RouterLink */
    @Input()
    uri?: string;

    /** The Font Awesome icon to display to the left of the link */
    @Input()
    fontIcon?: string;

    /** The text to display */
    @Input()
    linkText: string;

    @HostBinding('style.position') position = 'relative';
    @HostBinding('style.display') display = 'block';

    @ViewChild('toggle') _resultToggle: ElementRef;

    private _linkChildren;
    _childrenShown: boolean = false;

    @ContentChildren(SidenavLinkComponent)
    private _children?: QueryList<SidenavLinkComponent>;

    constructor(
        private renderer: Renderer2,
    ) {}

    get children() {
        if (!this._children) {
            return;
        }
        // Check to see if link children exist
        this._linkChildren = this._children.filter(c => c !== this);
        return this._linkChildren;
    }

    _toggleChildren() {
        this._childrenShown = !this._childrenShown;

        if (this._childrenShown) {
            this.renderer.addClass(this._resultToggle.nativeElement, 'flip-around');
        } else {
            this.renderer.removeClass(this._resultToggle.nativeElement, 'flip-around');
        }
    }

}
