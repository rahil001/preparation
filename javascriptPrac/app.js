var singleton = (function () {
    var instance;
    function getInstance(){
        return new Object();
    }
    return {
        getInstance: function () {
            if(!instance){
                instance = getInstance();
            }
            return instance;
        }
    }
})();

var x = new singleton.getInstance('A');
var y = new singleton.getInstance('B');

var PubSub = function () {
    this.events = {};
    this.listener = function (eventname, fn) {
        this.events[eventname] = this.events[eventname] || [];
        this.events[eventname].push(fn)
    };
    this.emit = function (eventname, data) {
        this.events[eventname].forEach(function (fn) {
            fn(data)
        })
    };
    this.off = function (eventname, fn) {
        this.events[eventname].forEach(function (event, index) {
            if (event === fn) {
                this.events[eventname].splice(index, 1)
            }
        })
    };
};
var a = new PubSub();

a.listener('noise', function (a) {
    console.log('shouttttt '+ a)
});

a.emit('noise', 'a');
var b = new PubSub();

b.listener('noise', function (b) {
    console.log('shouttttt ' + b)
});
b.emit('noise', 'b');


function connectHOC(mapStateToProps, mapDispatchToProps) {
  return function(WrappedComponent) {
    return class connect extends React.Component {
      <WrappedComponent />
    }
  }
}

function reverseInGroup(array, n) {
    for(i=0; i< array.length; i+=n) {
        let k = i;
        let l = (k + n - 1) >= array.length ? array.length - 1 : (k + n - 1);
        while(k <= l) {
            let temp = array[k];
            array[k] = array[l];
            array[l] = temp;
            k++;
            l--;
        }
    }
}
var array = [1, 2, 3, 4, 5]
reverseInGroup(array, 3);

const Singlton = function() {
    function createInstance() {
        return new Object();
    } 
    let instance;
    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
 }

 sum(1)(2)(3)();
 sum(1)(2)(3)(4)();

 function sum(a) {
     const temp = function(b) {
        if(b) {
            return temp;
        }
        return a + b
     }
     return temp;
 }

 function curry(fn) {
    if(fn.length === 0) {
        return fn.apply();
    }
    function nest(N, args) {
        return function() {
            var arg = [].slice.apply(arguments);
            if(N - arg.length <= 0) {
                return fn.apply(null, args.concat(arg));
            }
            args = args.concat(arg);
            return nest(N - args.length, args);
        }
    }
    return nest(fn.length, []);
  }
  
  var sum = function (x, y, z) {
    return x + y + z;
  }
  
  var result = curry(sum);
  console.log(result(1)(2)(3));
  console.log(result(1, 2)(3));
  console.log(result(1)(2, 3));
  