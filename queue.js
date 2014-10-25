"use strict";

(function() {
    var
    Queue = function() {
    };
    Queue.prototype = {
        index: 0,
        length: 0,

        add: function(callback, argArray) {
            this.push([].slice.call(arguments));
        },

        put: function(callback, argArray) {
            this.splice(this.index, 0, [].slice.call(arguments));
        },

        run: function() {
            var item;
            if( this.index in this ) {
                item = this[this.index++];
                return item[0].apply(this, item[1]);
            }
        },

        wait: function(ms) {
            this.add(function() {
                window.setTimeout(this.run.bind(this), ms);
            });
        },

        skip: function(count) {
            this.add(function() {
                this.index += count;
                this.run();
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

    if(typeof define === "function" && define.amd)
        define(function() { return Queue; });
    else if(typeof module === "object" && module.exports)
        module.exports = Queue;
    else
        this.Queue = Queue;
})();