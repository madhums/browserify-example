
/**
 * Hello
 */

class Hello {

  constructor (name) {
    this.message = 'Hello ' + (name || 'world');
  }

  say () {
    return this.message
  }
}

export default Hello;
