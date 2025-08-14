import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoPaste]'
})
export class NoPasteDirective {
  @HostListener('paste', ['$event']) onPaste(e: Event) { e.preventDefault(); }
  @HostListener('copy', ['$event']) onCopy(e: Event) { e.preventDefault(); }
  @HostListener('cut', ['$event']) onCut(e: Event) { e.preventDefault(); }
  @HostListener('drop', ['$event']) onDrop(e: Event) { e.preventDefault(); }
  @HostListener('dragover', ['$event']) onDragOver(e: Event) { e.preventDefault(); }
  @HostListener('contextmenu', ['$event']) onContext(e: Event) { e.preventDefault(); }
}