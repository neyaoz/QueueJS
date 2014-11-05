Queue JS
========
Queue JS is a simple library which can call your methods in a order you specify. You can make a queue with related methods, and start it whenever you want. It will call your methods one by one until complete. As you see, it's a basically kind of domino effect that can be controlled.

---

queue.add(function(entry) { return true; })
------------------------------------------
You can add your methods to the end of the queue by ***add*** method.

queue.put(function(entry) { return true; })
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

entry.next(steps = 1)
------------
You can run the next entry in the queue by  ***next*** method.

entry.prev(steps = 1)
------------
You can run the next entry in the queue by  ***prev*** method.

---

###Example 1:
```js
var queue  = new Queue();

    queue.add(function() {
        console.log("Call me.");
        return true;
    });

    queue.add(function() {
        console.log("Call me too.");
        this.next();
    });

    queue.add(function(entry) {
        $.get(file, function(data) {
            console.log("Parse data...");
            entry.next();
        });
    });

    queue.add(function() {
        console.log("Complated!");
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
            console.log("3th Entry");
            return true;
        });

        this.queue.add(function() {
            console.log("5th Entry");
            return true;
        });

        console.log("2nd Entry");
        return true;

    });

    queue.add(function() {
        console.log("4rd Entry");
        return true;
    });

    queue.run();
```