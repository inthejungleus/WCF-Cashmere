import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {
    transform(tel: number, args?: string): any {
        let formattedNumber = '';
        if (!tel) {
            return '';
        }

        let value: string = tel
            .toString()
            .trim()
            .replace(/^\+/, '');
        value = value.replace(/[^0-9]*/g, '');
        if (value.match(/[^0-9]/)) {
            return tel;
        }

        const area: string = value.substring(0, 3);
        const prefix: string = value.substring(3, 6);
        const num: string = value.substring(6, 10);
        const ext: string = value.substr(10);

        if (area) {
            formattedNumber = '(' + area + ') ';
        }

        if (prefix) {
            formattedNumber += prefix;
        }
        if (num) {
            formattedNumber += '-' + num;
        }
        if (ext) {
            formattedNumber += '  ext ' + ext;
        }
        return formattedNumber;
    }
}
