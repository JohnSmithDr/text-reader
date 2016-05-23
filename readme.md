# text-reader

ES6 text reader.

# Example

```JavaScript
let content = 'BEGIN\r\nFoo\r\nBar\r\nHello World\r\n\r\nEND';

let reader = TextReader.create(content);

let lines = [];

while (reader.available) {
  let line = reader.readLine();
  lines.push(line);
}

console.log(lines); // ['BEGIN', 'Foo', 'Bar', 'Hello World', '', 'END']
```

# Install

```
npm install text-reader --save
```

# License

MIT