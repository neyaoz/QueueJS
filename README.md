Queue JS
========
Queue JS is a simple library which can call your methods in a order you specify. You can make a queue with related methods, and start it whenever you want. It will call your methods one by one until complete. As you see, it's a basically kind of domino effect that can be controlled.

---

queue.add(callback, arg1, arg2, ..., argX)
------------------------------------------
You can add your methods to the end of the queue by ***add*** method.

queue.put(callback, arg1, arg2, ..., argX)
------------------------------------------
You can add your methods to the current state of the queue by ***put*** method.

queue.run()
-----------
You can start the queue with the first call, and move to the next by ***run*** method.

---

queue.wait(milliseconds)
------------------------

queue.skip(steps)
------------------------

queue.reset()
------------------------

---

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
