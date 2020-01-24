[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)


### rsql-parser

A javascript lexer, parser ~~and visitor for the predicate expression language RSQL~~. ~~Useful for turning
simple string expressions into a function that resolves to either true or false when provided 
a chunk of data.~~

Useful if you need to parse RSQL queries in javascript and do something with them.

### About

This is forked from [vodori/rsql-parser](https://github.com/vodori/rsql-parser) make the antlr4 generated Lexer, Parser, and Visitor importable. 
It does not include the predicate checker (as I don't need it)

### Reporting issues

Don't submit issues if you can't provide a PR. I don't have time to maintain this.

### Usage

```javascript
import antlr4 from "antlr4";
import { RSQLLexer, RSQLParser, RSQLVisitor } from "rsql-parser";


const characters = new antlr4.InputStream(s);
const lexer = new RSQLLexer.RSQLLexer(characters);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new RSQLParser.RSQLParser(tokens);

parser.buildParseTrees = true;
const tree = parser.statement();

// Do whatever you want with that

```

### How it works 

**Vodory say's**: We've written an RSQL grammar for Antlr4. We compile this grammar into a lexer, parser, and base visitor. We then
extend the base visitor with hand-written code that builds the parsed AST into a function of one argument that returns
a boolean indicating if the data matches the expression. The grammar still needs battle testing and may be missing
support for certain edge cases. Please see the tests for examples of what is / isn't supported and expected behavior.

### Motivation

**Vodory say's**: RSQL is used internally as a predicate expression language within Vodori's Pepper Cloud product suite. We're creating
a browser compatible version so that we can extend dynamic configurable behavior to the browser but without asking the 
people writing configuration to learn a new expression language.

### License

**Vodory say's**: This project is licensed under [MIT license](http://opensource.org/licenses/MIT).
