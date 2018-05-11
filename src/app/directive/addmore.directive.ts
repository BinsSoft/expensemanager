import { Directive, Input, OnInit, HostListener, ElementRef  } from '@angular/core';

@Directive({
  selector: '[appAddmore]'
})
export class AddmoreDirective implements OnInit {
	@Input('appAddmore') addmoreContainer: string; 
	constructor(private e : ElementRef) {
	
	}
	@HostListener('click') onClick() {
		var parent = document.getElementById(this.addmoreContainer);
		var cloneElement = parent.lastChild;
		
		var newChild = cloneElement.cloneNode(true);
		var corss = document.createElement('i');
		corss.innerHTML = '&#10006;';
		newChild.insertBefore(corss,newChild.firstChild);
		parent.insertBefore(newChild, parent.firstChild);
	}
	ngOnInit() {
			
  	}
}
