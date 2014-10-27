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
        run: function(index) {
            if(!index ) {
                index = this.index;
            }

            var entry;
            if( entry = this[index] ) {
                this.index = index;
                return entry.callback.apply(entry, entry.argArray);
            }
            return null;
        },

        wait: function(ms, steps) {
            this.put(function() {
                window.setTimeout(this.next.bind(this,steps), ms);
            });
        },
        skip: function(steps) {
            this.add(function() {
                this.queue.index += steps;
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
        next: function(steps) {
            return this.queue.run(this.queue.index+(steps||1));
        },
        prev: function(steps) {
            return this.next(-steps);
        }
    };

    if(typeof define === "function" && define.amd)
        define(function() { return Queue; });
    else if(typeof module === "object" && module.exports)
        module.exports = Queue;
    else
        window.Queue = Queue;
})();
