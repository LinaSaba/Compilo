class StackMachine {

	constructor() {
		this.stack = new Array()
	}

	push(num) {
		this.stack.push(num)
		console.log('push', num, this.stack)
	}

	add() {
		const right = this.stack.pop()
		const left = this.stack.pop()
		const res = left + right
		this.push(res)
		console.log('add', right, left, res)
	}

	
	sub() {
		const right = this.stack.pop()
		const left = this.stack.pop()
		const res = left - right
		this.push(res)
		console.log('sub', right, left, res)
	}
	
	mult() {
		const right = this.stack.pop()
		const left = this.stack.pop()
		const res = left * right
		this.push(res)
		console.log('mult', right, left, res)
	}
	
	div() {
		const right = this.stack.pop()
		const left = this.stack.pop()
		const res = left / right
		this.push(res)
		console.log('div', right, left, res)
	}

	get result() {
		if (this.stack.length != 1) throw `La pile doit contenir un seul élément !!!!\nStack = ${this.stack}`
		return this.stack[0]
	}

}

module.exports = new StackMachine()