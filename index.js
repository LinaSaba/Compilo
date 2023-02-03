// tsic22@ensg.eu

const stackMachine = require('./StackMachine')

/* Comment utiliser la stack machine pour 2 + 3 * 4

stackMachine.push(2)
stackMachine.push(3)
stackMachine.push(4)
stackMachine.mult()
stackMachine.add()

console.log('result', stackMachine.result);

*/

const exp = "3 * (3 + 17) + 255"

// LEXER
const TYPE_NUM = 'num'
const TYPE_SYMB = 'symb'

let cursor = 0
let string = ""
let tokens = []

function consume() {
	string = string + current()
	cursor ++
}

function current() {
	return exp[cursor]
}

function product(type) {
	const token = {symbol : string, type: type}
	tokens.push(token)
	string = ""
}

function ignore() {
	string = ""
}

function testIn(chrs) {
	return chrs.includes(current())	
}

// N = [0-9]
function testNum() {
	return testIn('0123456789')
}

// num = [0-9]+
function parseNum() {
	if (!testNum()) return false
	do {
		consume()
	} while(testNum())

	product(TYPE_NUM)
	return true
}

// symb = '(' | ')' | '*' | '+'
function parseSymb() {
	if (testIn('(')) consume()
	else if (testIn(')')) consume()
	else if (testIn('*')) consume()
	else if (testIn('+')) consume()
	else if (testIn('/')) consume()
	else if (testIn('-')) consume()
	else return false

	product(TYPE_SYMB)
	return true
}

// null = ' ' | '\t' | '\n'
function parseNull() {
	if (testIn(' ')) consume()
	else if (testIn('\t')) consume()
	else if (testIn('\n')) consume()
	else return false

	ignore()
	return true

}

// lexer = (num | symb | null)*
function lexer() {

	while (parseNum() | parseSymb() | parseNull()) {}

	return true
}

lexer()
console.log('tokens', tokens);

// PARSER (à vous de completer ;-) )

const pile = []
//elt is an index

let cursorP = 0
function consumeP(){
	cursorP ++
}

function parseA(){	
	parseM()
	if ( cursorP < tokens.length) {

		if ( tokens[cursorP].symbol == "+" ){

			consumeP()
			console.log('cursor',cursorP)
			parseA(tokens[cursorP])

			stackMachine.add()
		}
		else if ( tokens[cursorP].symbol == "-"){

			consumeP()
			console.log('cursor',cursorP)
			parseA(tokens[cursorP])

			stackMachine.sub()
		}
	}
	return true

}

function parseM(){
	parseP()
	if ( cursorP < tokens.length) {

	
		if ( tokens[cursorP].symbol == "*" ){

			consumeP()
			console.log('cursor',cursorP)
			parseM(tokens[cursorP])

			stackMachine.mult()
		}
		else if ( tokens[cursorP].symbol == "/"){

			consumeP()
			console.log('cursor',cursorP)
			parseM(tokens[cursorP])

			stackMachine.div()
		}
	}
	return true

}

function parseP(){
	if ( cursorP < tokens.length) {

		if ( tokens[cursorP].type == TYPE_NUM ){
			console.log(tokens[cursorP])
			stackMachine.push(parseInt(tokens[cursorP].symbol))
			consumeP()		
			console.log('cursor',cursorP)
		}
		else if (tokens[cursorP].symbol == '(') {
			consumeP()
			console.log('cursor1',cursorP)
			parseA(tokens[cursorP]);
			if (! tokens[cursorP].symbol == ')'){
				return false
			}
			consumeP()
			console.log('cursor',cursorP)
		}
	}
	
	return true;
}

parseA()
console.log("res", stackMachine.result)