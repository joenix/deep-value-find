# deep-value-find

```sh
npm i -s deep-value-find
# or
yarn add deep-value-find
```

```js
import valueFind from "deep-value-find";

var data = {
  example: {
    key: [
      {
        value: 1
      },
      {
        value: "hello world"
      },
      {
        value: [1, 2, 3, 4]
      }
    ]
  }
};

var test = valueFind(data, 'example.key[].value'); // console: [1, "hello world", [1,2,3,4]]
```
