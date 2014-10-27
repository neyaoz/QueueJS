"use strict";

(function() {
    var
    Queue = function() {

    };
    Queue.prototype = {
        index: 0,
        length: 0,

        add: function(callback, argArray) {
            this.push(new Entry(this, callback, [].slice.call(arguments, 1)));
        },
        put: function(callback, argArray) {
            this.splice(this.index+1, 0, new Entry(this, callback, [].slice.call(arguments, 1)));
        },
        run: function() {
            var entry;
            if( entry = this[this.index] ) {
                return entry.callback.apply(entry, entry.argArray);
            }
            return null;
        },

        wait: function(ms) {
            this.put(function() {
                window.setTimeout(this.next.bind(this), ms);
            });
        },
        skip: function(count) {
            this.add(function() {
                this.queue.index += count;
                this.next();
            });
        },
        reset: function() {
            this.index = 0;
        },

        toArray: function() {
            return [].slice.call(this);
        },

        //Behaves like an Array's method
        push: [].push, sort: [].sort, splice: [].splice
    };

    var
    Entry = function(queue, callback, argArray) {
        this.queue = queue;
        this.callback = callback;
        this.argArray = argArray;
    };
    Entry.prototype = {
        next: function() {
            var queue = this.queue;

            if( queue.index+1 in queue ) {
                return queue.run(queue.index++);
            }
            return null;
        },
        prev: function() {
            var queue = this.queue;

            if( queue.index-1 in queue ) {
                return queue.run(queue.index--);
            }
            return null;
        }
    };

    if(typeof define === "function" && define.amd)
        define(function() { return Queue; });
    else if(typeof module === "object" && module.exports)
        module.exports = Queue;
    else
        window.Queue = Queue;
})();
