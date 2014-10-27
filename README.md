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
You can start the queue by ***run*** method.

---

queue.wait(milliseconds)
------------------------

queue.skip(steps)
------------------------

queue.reset()
------------------------

---

entry.next()
------------
You can run the next entry in the queue by  ***next*** method.

entry.prev()
------------
You can run the next entry in the queue by  ***next*** method.

---

###Example 1:
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
        this.next();
    });
    queue.add(function() {
        console.log("Call me too.");
        this.next();
    });

    queue.run();
```

###Example 2:
```js
var queue = new Queue();

    queue.add(function() {
        console.log("1st Entry");
        this.next();
    });
    queue.add(function() {
        this.queue.put(function() {
            console.log("4th Entry");
            this.next();
        });
        this.queue.add(function() {
            console.log("5th Entry");
            this.next();
        });
        console.log("2nd Entry");
        this.next();
    });
    queue.add(function() {
        console.log("3rd Entry");
        this.next();
    });

    queue.run();
```
