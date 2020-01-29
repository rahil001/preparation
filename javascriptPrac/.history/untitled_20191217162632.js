if (typeof Object.create !== "function") {
  Object.create = function(proto) {
    var obj = new Object();
    obj.__proto__ = proto;
    return obj;
  };
}

function bind1(fn, arg) {
  const context = this;
  return function() {
    fn.call(context, arg);
  };
}

// memory leaks
// in javascript it is done through garbage collection
// 2 popular algorithms used 1. reference count 2. mark and sweep
// This algorithm relies on the notion of ‘reference’. It is based on counting the number of reference to an object from other objects. Each time an object is created or a reference to the object is assigned, it’s reference count is increased.
//Unlike the reference count algorithm, Mark-and-sweep reduces the definition of “an object is not needed anymore” to “an object is unreachable” rather than “not referenced”.

function NewPromise(action) {

    this.state= 'pending';
    this.successCallbacks = [];
    this.errorCallbacks = [];
    this.then = function(fn) {
        this.successCallbacks.push(fn);
        return this;
    }
    this.error = function(fn) {
        this.errorCallbacks.push(fn);
        return this;
    }
    action(this.resolver.bind(this), this.rejector.bind(this));

    this.resolver = function(data) {
        this.state= 'resolved';
        this.successCallbacks.forEach(fn => {
            fn(data);
        });
    }
    this.rejector = function(data) {
        this.state= 'rejected';
        this.successCallbacks.forEach(fn => {
            fn(data);
        });
    }
}

var newPromise = new NewPromise(function(resolve, reject) {
    reject('pending...');
    setTimeout(() => {
      resolve('done...')
    }, 3000)
}).then((res) => {
  console.log(res);
}).error((err) => {
  console.log(err);
});

var temp = curry(average, 1, 2, 3);
temp(10); //4 - stores 1, 2, 3 in closures and adds 10 for average
temp(1, 2); 

function average(...num) {
  let res;
  res = num.reduce((init, n) => {
    return init + n;
  }, 0);
  return res/num.length;
}

function curry(fn, ...arg1) {
  return function (...arg2) {
    return fn(...arg1, ...arg2)
  }
}

function factorial(n) {
  let cache = {};
  return function() {
    if(cache[n]) {
      console.log('from cache')
      return cache[n]
    } else {
      console.log('Not from cache')
      cache[n] = caculateFactorial(n)
      return cache[n];
    }
  }
}

function caculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * caculateFactorial(n-1)
}

var x = factorial(4)();

function lib() {
  this.value = 0;
  this.add = function(val) {
    this.value += val
    return this;
  }
  this.sub = function(val) {
    this.value -= val
    return this;
  }
  this.mul = function(val) {
    this.value *= val
    return this;
  }
  this.div = function(val) {
    this.value /= val
    return this.value;
  }
}

var lib = new lib();
lib.add(10).sub(20).mul(2).div(1)
function flatten(array) {
  array.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, [])
}

const singleton = (function() {
    var instance;
    function createInstance() {
      instance = new Object()
      return instance;
    }
    return {
      getInstance: function() {
        if (!instance) {
          return createInstance();
        }
        return instance;
      }
    }
})();

function Observer() {
  this.events = {};

  this.subscribe = function(eventName, fn) {
    this.events[eventName] = (this.events[eventName] || []).push(fn);
  }

  this.emit = function(eventName, args) {
    this.events[eventName].forEach((fn) => {
      fn(args);
    })
  }
  this.unsubscribe = function(eventName, fn) {
    this.events[eventName].forEach((listeners, index) => {
      if (listeners === fn) {
        this.events[event].splice(index, 1)
      } 
    })
  }
}

function debounce(fn, delay) {
    let timer;
    return function() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay)
    }
}

function throttleFn(fn, delay) {
  let inThrottle = false;
  return function() {
    const context = this;
    const agrs = arguments;
    if(!inThrottle) {
      inThrottle = true;
      setTimeout(function() {
        fn.apply(context, agrs);
        inThrottle = false;
      }, delay)
    }
  }
}

var throttle = throttleFn(() => {
  console.log('Hi')
}, 3000);
window.addEventListener('scroll', throttle);

function NewPromise(action) {
  this.state = 'PENDING';
  this.successCallbacks = [];
  this.errorCallbacks = [];
  this.then = function(callback) {
    this.successCallbacks.push(callback);
    return this;
  }
  this.catch = function(error) {
    this.errorCallbacks.push(error);
    return this;
  }
  action(resolver.bind(this), rejector.bind(this));

  function resolver(value) {
    this.state = 'RESOLVED';
    this.successCallbacks.forEach((fn) => {
      fn(value);
    })
  }

  function rejector(error) {
    this.state = 'REJECTED';
    this.errorCallbacks.forEach((fn) => {
      fn(error);
    })
  }
}

new NewPromise(function(resolve, reject) {
  setTimeout(() => {
    reject('I am rejected');
  }, 1000)
  setTimeout(() => {
    resolve('I am resolved');
  }, 2000)
}).then((val) => {
  console.log(val);
}).catch((error) => {
  console.log(error);
})

function TaskRunner(concurrency) {
  this.active = 0;
  this.store = [];
  this.limit = concurrency;
}
TaskRunner.prototype.run = function(task) {
  if(this.active < this.limit) {
    this.execute(task);
  } else {
    this.store.push(task);
  }

}

TaskRunner.prototype.execute = function(task) {
  this.active++;
  task.then(() => {
    this.active--;
    this.store.splice(1);
    this.execute(this.store[0]);
  })
}

// websockets
// websockets is similar to http calls but with a upgrade header in the request, they also use 'ws' and 'wss' schema same as secured
const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer((request, response) => {

});

server.listen(1337, () => {});

wserver = new WebSocketServer({
  httpServer: server
});


wserver.on('request', (request) => {
  var connection = request.accept(null, request.origin);
  connection.on('message', () => {})
  connection.on('close', () => {})
})


function memoize(fn) {
  const cache = {};
  return function(...args) {
    if(!cache[args]) {
      cache[args] = fn.apply(args)
    }
    return cache[args];
  }
}

fastFact = memoize(factorial)
function factorial(n) {

  if (n === 0 || n === 1) {
    return 1;
  }
  
  return n * fastFact(n - 1);
}
