import {AfterViewInit, Directive, ElementRef, HostListener,
    Input, OnInit, Renderer2} from '@angular/core';

    @Directive({
        selector: '[hcMaxLength]'
    })
    export class MaxLengthDirective implements OnInit, AfterViewInit {
        @Input() hcMaxLength: number;
        private div: HTMLDivElement;

        constructor(private el: ElementRef, private renderer: Renderer2) {}

        @HostListener('input', ['$event']) onChange(event) {
            this.update(event.target.value.length);
        }

        ngOnInit() {
        this.renderer.setAttribute(this.el.nativeElement, 'maxLength', this.hcMaxLength.toString());
        }

        ngAfterViewInit() {
            this.div = this.renderer.createElement('span');
            this.div.classList.add('char-count');
            this.renderer.insertBefore(this.el.nativeElement.parentNode.parentNode.parentNode, this.div, this.el.nativeElement.nextSibling);
            this.update(this.el.nativeElement.value.length);
        }

        private update(length: number) {
            if (length === this.hcMaxLength){
                this.renderer.addClass(this.div, 'char-count-error');
            } else {
                this.renderer.removeClass(this.div, 'char-count-error');
            }
            this.renderer.setProperty(this.div, 'innerText', `${length}/${this.hcMaxLength}`);
        }
    }