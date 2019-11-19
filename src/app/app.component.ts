import { Component } from '@angular/core';

function logClass(decoratedClass){
  console.log(decoratedClass)
  return (...args) => {
    console.log("logClass Args ", args)
    return new decoratedClass(...args)
  }
}

function log(target, name, descriptor){
  console.log(target, name, descriptor)
  const original = descriptor.value
  descriptor.value = function(...args){
    console.log('Args ', args)
    const result = original.apply(this, args)
    console.log('Result ', result)
    return result
  }
  return descriptor
}

// @logClass - He messed this up, will need to figure out class decorators on my own.
class ExampleClass {
  constructor(arg1, arg2){
    console.log("Constructed with ", arg1, arg2)
  }
}

const myClass = new ExampleClass(5,10)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-freecodecamp';

  constructor(){ 
    this.aSimpleMethod(5, 2)
  }

  @log
  aSimpleMethod(a, b){
    return a*b
  }
}
