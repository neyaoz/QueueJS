"use strict";

(function() {
    var
    Queue = function() {

    };
    Queue.prototype = {
        index: 0,
        length: 0,

        add: function(callback) {
            this.push(new Entry(this, callback));
            return this;
        },
        put: function(callback) {
            this.splice(this.index+1, 0, new Entry(this, callback));
            return this;
        },
        run: function(index) {
            if(!index ) {
                index = this.index;
            }

            var entry;
            if( entry = this[index] ) {
                this.index = index;
                if( entry.callback.apply(entry, [entry]) === true ) {
                    entry.next();
                    return true;
                }
            }

            return false;
        },
        wait: function(ms) {
            //TODO Can not be used inside of entry callback
            return this.add(function() {
                window.setTimeout(this.next.bind(this), ms);
            });
        },
        skip: function(steps) {
            //TODO Can not be used inside of entry callback
            return this.add(function() {
                this.next(steps);
            });
        },
        reset: function() {
            this.index = 0;
            return this;
        },

        toArray: function() {
            var i, cbArray = [];

            for(i in this) {
                if( this.hasOwnProperty(i) ) {
                    cbArray.push(this[i].callback);
                }
            }

            return cbArray;
        },

        //Behaves like an Array's method
        push: [].push, sort: [].sort, splice: [].splice
    };

    var
    Entry = function(queue, callback) {
        this.queue = queue;
        this.callback = callback;
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
