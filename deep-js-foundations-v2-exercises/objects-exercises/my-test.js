class Workshop {
  constructor(teacher) {
    this.teacher = teacher
    this.askBind = this.ask.bind(this)
  }

  ask(question) {
    console.log(this.teacher, question)
  }

  // ask2 = () => {
  //   console.log(this.teacher, question)
  // }
}

var deepJS = new Workshop('Kyle')
var reactJS = new Workshop('Suzy')

deepJS.ask("Is 'class' a class?")

reactJS.ask('Is this class OK?')

setTimeout(deepJS.ask.bind(deepJS), 100, "Still losing 'this'?")
setTimeout(deepJS.ask, 100, "Still losing 'this'?")
setTimeout(deepJS.askBind, 100, "Still losing 'this'?")
