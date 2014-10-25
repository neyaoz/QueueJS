Queue JS
========

Queue JS is a simple library which can call your methods in a order you specify. You can make a queue with related methods, and start it whenever you want. It will call your methods one by one until complete. As you see, it's a basically kind of domino effect that can be controlled.

###e.g.

```js
    function readData(file) {
        $.get(file, function() {
            this.run();
        });
    };

    var queue  = new Queue();

        queue.add(readData, "example-1.json");

        queue.add(function() {
            console.log("Call me.");
            this.run();
        });

        queue.add(function() {
            console.log("Call me too.");
            this.run();
        });

        queue.run();
```