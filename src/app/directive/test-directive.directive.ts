import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTestDirective]'
})
export class TestDirectiveDirective {

  constructor(element : ElementRef) {
    console.log(element);
    element.nativeElement.innerText = 'TEST DIRECTIVE';
   }

}
