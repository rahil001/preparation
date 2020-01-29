// flatten an array
function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }

  // closure
  for (var i = 0; i < arr.length; i++) {
    (function (i) {
      setTimeout(() => {
        console.log(i);
      }, 1000)
    })(i)
  }

  // Array.map polyfill
if (typeof Array.prototype.map !== 'function') {
  Array.prototype.map = function(fn) {
    var rv = [];
    
    for(var i=0, l=this.length; i<l; i++)
      rv.push(fn(this[i]));

    return rv;
  };
}

// Array.filter poyfill
if (typeof Array.prototype.filter !== 'function') {
  Array.prototype.filter = function(fn) {
    const res = [];
    for (let i=0; i< this.length; i++) {
        if(fn(this[i])) {
            res.push(this[i]);
        }
    }
    return res;
  }
}
// Object.create polyfill

if(typeof Object.create !== 'function') {
  Object.create = (function() {
      var obj = {};
      return function(prototype) {
          obj.prototype = prototype
          return obj;
      }
      var obj = new Object();
      obj.__proto__ = proto;
  })();
}

// prototype design pattern 
`basically it returns an object with some default value that is inherited from other object`
function CustomerPrototype(proto) {
  this.proto = proto;

  this.clone = function () {
      var customer = new Customer();
      customer.first = proto.first;
      customer.last = proto.last;
      customer.status = proto.status;
      return customer;
  };
}

function Customer(first, last, status) {

  this.first = first;
  this.last = last;
  this.status = status;

  this.say = function () {
      alert("name: " + this.first + " " + this.last +
            ", status: " + this.status);
  };
}

function run() {
  var proto = new Customer("n/a", "n/a", "pending");
  var prototype = new CustomerPrototype(proto);

  var customer = prototype.clone();
  customer.say();
}


// singleton design pattern 
var singleton = (function() {
   var instance;
    function createObj() {
      return new Object();
    }
    return {
      getInstance: function() {
          if(!instance) {
            instance = createObj();
          }
          return instance;
      }
    }
})();

// observer pattern

function Observer() {
  this.events = {};
  this.subscribe = function(event, fn) {
    this.events[event] = (this.events[event] || []).push(fn);
    //this.events[event].push(fn);
  }
  this.unsubscribe = function(event, fn) {
    this.events[event].forEach((func, index) => {
          if(func === fn) {
            this.events[event].splice(index, 1);
          }
      });
  }
  this.emit = function(event, args) {
    this.events[event].forEach((item)=> {
          item(args);
      })
  }
}

// debounce 

function debouce(fn, delay) {
  let timer;
    return function () {
      let args = arguments;
      let context = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => { fn.apply(context, args) }, delay);
    }
}

// throtte
function throttle(fn, delay) {
  let inThrottle = false;
    return function() {
          let context = this;
          let args = arguments;
          if(!inThrottle) {
            inThrottle = true;
            setTimeout(() => {
              fn.apply(context, args)
              inThrottle = false;
            }, delay)  
          }
    }
}

var throttle = throttle(() => {
  console.log('Hi')
}, 3000);
window.addEventListener('scroll', throttle);

// A repaint occurs when changes are made to an elements skin that changes visibly, but do not affect its layout.
// A reflow is even more critical to performance because it involves changes that affect the layout of a portion of the page (or the whole page).

// about JSONP
`https://stackoverflow.com/questions/5943630/basic-example-of-using-ajax-with-jsonp`

`https://performancejs.com/post/hde6d32/The-Best-Frontend-JavaScript-Interview-Questions-(Written-by-a-Frontend-Engineer`

`https://codeburst.io/de-coding-the-front-end-development-interview-process-9601bc4c71e5`

`https://frontendmasters.com/books/front-end-handbook/2018/practice/interview-q.html`

'What happens when you call setState? Describe the flow.'
'react hooks'
'What happens when you call setState? Describe the flow.'
'https://itnext.io/broken-promises-a-barely-working-implementation-of-js-promises-ed7f99071f54'

// sum(1)(2)(3)(4).... ();

function sum(a) {
  return function(b) {
      if (b) {
        return sum(a + b);
      }
      return a;
  }
}

customSetInterval = function (cb, interval) {
  setTimeout(function() {
    customSetInterval(cb, interval);
  }, interval);
}

customSetInterval(function() {
  console.log('I am custom interval')
}, 1000)

function sortObj (arr) {
  arr.sort(function (a, b) {
    if(a.score > b.score) {
      return -1;
    }
    if(a.score < b.score) {
      return 1;
    }
    if(a.name > b.name) {
      return 1;
    }
    if(a.name < b.name) {
      return -1;
    }
    return 0;
  })
}

foo();
function foo() {
  var bar = function(){
    return 3
  }
  return bar()
  var bar = function(){
    return 8
  }
}

var temp = [{ name: "rahil", score: 20 }, { name: "imroz", score: 30 }, { name: "talha", score: 10 }, { name: "adam", score: 10 }];
sortObj(temp);

// To summarize, In case of Sticky Sessions, all your requests will be directed to the same physical web server
// while in case of a non-sticky loadbalancer may choose any webserver to serve your requests.
// solution create a session storage layer like DB to store session objects then load balancer will redirect the request
// to the same web server

// Approach to system design questions
// 1. Requirements
// 2. Design consideration
// 3. capacity and constraints
// 5. High Level System Design
// 6. Database schemas storage pattern
// 7. Data Size Estimation
// 8. component design
// 9. Reliability and Redundancy
// 11. Cache and Load balancing

// By using content hashes within your bundle file names, you can indicate to the browser when the content 
// of a file has changed, thus invalidating the cache. Once you start doing this though, you'll immediately 
// notice some funny behavior. Certain hashes change even when their content apparently does not. 
// This is caused by the injection of the runtime and manifest, which changes every build.

// https://habiletechnologies.com/blog/how-to-improve-websites-speed-with-cdn/#1494420238617-894d74fb-f81a

function add(a) {
  const tempFunc = function (b) {
    return a + b;
  }
  return function(b) {
    if (!b) {
      return tempFunc;
    }
    return a + b;
  }
}
add(1)(2);

// 
function dataBind(domElement, obj) {  
  var bind = domElement.getAttribute("bind").split(":");
  var domAttr = bind[0].trim(); // the attribute on the DOM element
  var itemAttr = bind[1].trim(); // the attribute the object

  // when the object changes - update the DOM
  Object.observe(obj, function (change) {
      domElement[domAttr] = obj[itemAttr]; 
  });
  // when the dom changes - update the object
  new MutationObserver(updateObj).observe(domElement, {
      attributes: true,
      childList: true,
      characterData: true
  });
  domElement.addEventListener("keyup", updateObj);
  domElement.addEventListener("click", updateObj);
  function updateObj(){
      obj[itemAttr] = domElement[domAttr];   
  }
  // start the cycle by taking the attribute from the object and updating it.
  domElement[domAttr] = obj[itemAttr]; 
}

function doAdd() {
  const args = Array.prototype.slice.apply(arguments);
  let sum = 0;
  args.forEach((arg) => {
    sum+=arg
  });
  if(args.length > 1) {
    return sum;
  }
  return function(anotherParam) {
      return sum + anotherParam;
  }
}

function NewPromise(action) {
  this.state = 'pending';
  this.value = '';
  this.thencallbacks = [];
  this.errorcallbacks = [];
  this.then = function(callback) {
    this.thencallbacks.push(callback);
    return this;
  }
  this.catch = function(callback) {
    this.errorcallbacks.push(callback);
    return this;
  }

  action(resolver.bind(this), rejector.bind(this));

  function resolver(value) {
    this.state = 'resolved';
    this.value = value
    this.thencallbacks.forEach((fn) => {
      fn(this.value);
    })
  }

  function rejector(error) {
    this.state = 'rejected';
    this.value = error
    this.errorcallbacks.forEach((fn) => {
      fn(this.value);
    })
  }
}


var x = new NewPromise(function(resolve, reject) {
  setTimeout(function() {
    reject("invalid");
  }, 1000)
  setTimeout(function() {
    resolve("valid");
  }, 3000)
})
x.then(function(data) {
  console.log(data)
}).catch(function(error) {
  console.log(error);
})

// master slave , sharding (parting or grouping the traffic), proper indexing , reducing the query that consists of too many joins (denormalize), consistent hashing

function ApiLimmiter(fn, delay, count) {
  let isRunning = false;
  let numberOfCalls = 0;
  const timer;
  return function() {
    const args = arguments;
    const context = this;
    numberOfCalls++;
    if(!isRunning || numberOfCalls <= count) {
      timer = setTimeout(function() {
        fn.call(context, args);
      }, delay)
    } else if(numberOfCalls > count) {
        clearTimeout(timer);
    }
  }
}

function ApiLimiter(index) {
  if (index > MAX_REQUEST) {
    console.log('ALL DONE!');
    return;
  }
  setTimeout(function() {
    ApiLimiter(index + 1);
  }, delay);

  makeHTTPRequest();
}

function TaskRunner (concurrent) {
  this.active = 0;
  this.store = [];
  this.limit = concurrent;
}

TaskRunner.prototype.next = function() {
  if (this.store.length) {
    this.runTask(...this.store.shift());
  }
}

TaskRunner.prototype.runTask = function(task, name) {
  this.active++;
  task(name).then(() => {
    this.active--;
    this.next();
  })
}

function sum(a) {
  return function(b) {
    if(!b) {
      return a;
    } else {
      return sum(a + b);
    }
  }
}


TaskRunner.prototype.push = function(task, name) {
  if (this.active < this.limit) {
    this.runTask(task, name)
  } else {
    this.store.push(task);
  }
}

const exampleTaskA = (name) => new Promise(resolve => setTimeout(function() {
  console.log(`Task ${name} Done`);
  resolve()
}, Math.floor(Math.random() * 2000)))
var task = new TaskRunner(2);
task.push(exampleTaskA, 1);
task.push(exampleTaskA, 2);
task.push(exampleTaskA, 3);
task.push(exampleTaskA, 4);
task.push(exampleTaskA, 5);
task.push(exampleTaskA, 6);
task.push(exampleTaskA, 7);

// LRU Caching 
class Node {
  constructor(key, value, next = null, prev = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class LRU {
  //set default limit of 10 if limit is not passed.
  constructor(limit = 10) {
    this.size = 0;
    this.limit = limit;
    this.head = null;
    this.tail = null;
    this.cache = {};
  }

  // Write Node to head of LinkedList
  // update cache with Node key and Node reference
  write(key, value){
    this.ensureLimit();

    if(!this.head){
      this.head = this.tail = new Node(key, value);
    }else{
      const node = new Node(key, value, this.head);
      this.head.prev = node;
      this.head = node;
    }

    //Update the cache map
    this.cache[key] = this.head;
    this.size++;
  }

  // Read from cache map and make that node as new Head of LinkedList
  read(key){
    if(this.cache[key]){
      const value = this.cache[key];
      
      // node removed from it's position and cache
      this.remove(key)
      // write node again to the head of LinkedList to make it most recently used
      this.write(key, value);

      return value;
    }

    console.log(`Item not available in cache for key ${key}`);
  }

  ensureLimit(){
    if(this.size === this.limit){
      this.remove(this.tail.key)
    }
  }

  remove(key){
    const node = this.cache[key];

    if(node.prev !== null){
      node.prev.next = node.next;
    }else{
      this.head = node.next;
    }

    if(node.next !== null){
      node.next.prev = node.prev;
    }else{
      this.tail = node.prev
    }

    delete this.cache[key];
    this.size--;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.cache = {};
  }

  // Invokes the callback function with every node of the chain and the index of the node.
  forEach(fn) {
    let node = this.head;
    let counter = 0;
    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }

  // To iterate over LRU with a 'for...of' loop
  *[Symbol.iterator]() {
    let node = this.head;
    while (node) {
      yield node;
      node = node.next;
    }
  }
}

function xyz() {
  let args = arguments;
  console.log(args);
}

function TaskRunner(concurrency) {
  this.active = 0;
  this.store = [];
  this.limit = concurrency;
}

TaskRunner.prototype.push = function(task, name) {
  if (this.active < this.limit) {
    this.runTask(task, name);
  } else {
    this.store.push([task, name]);
  }
}

TaskRunner.prototype.runTask = function(task, name) {
  this.active++;

  task(name).then(()=> {
    this.active--;
    this.next();
  })
}

TaskRunner.prototype.next = function () {
  if (this.store.length) {
      this.runTask(...this.store.shift());
  }
}

// redux
// reducer.js

const reducer = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case 'ADD':
      return { ...state, val: state.val + 1 }
    default:
      return state;
  }
}
export default reducer;

// store.js
import reducer from './reducer';
const state = {};

const listiners = [];

const getState = () => state;

const dispatch = (action) => {
    state = reducer(state, action);
    listiners.forEach((fn) => {
      fn();
    })
}
dispatch({});

const reducers = () => reducer;
reducers(); //getting the reducers

const subscribe = (listener) => {
  listiners.push(listener);

  return () => {
    listiners.filter((ln) => ln!==listener)
  }
}

const Async = (cb, request) => {
  request(cb);
}

const thunk = (cb, request, delay) => {
  if (delay) {
    return setTimeout(() => {
      Async(cb, request);
    }, delay);
  }
  Async(cb, request);
}

export default { getState, subscribe, dispatch, thunk }

// inside index.js

import { subscribe } from './store';

subscribe(()=>render(
  <App />,
  document.getElementById("root")
))

assignDeep = function(source, target) {
  const result = {};
  Object.keys(source).forEach((key1) => {
    result[key1] = source[key1];
  })
  Object.keys(target).forEach((key2) => {
    result[key2] = target[key2];
  });
  return result;
}

var a = () => Promise.resolve('a')
var b = () => Promise.resolve('b')
var c = () => new Promise(resolve => setTimeout(() => resolve('c'), 100))

function reduceAsyncUtil(arr, cb, accumulator) {
  for(let i of arr) {
    accumulator = cb(accumulator, i)
  }
  return new Promise((resolve) => {
    resolve(accumulator);
  })
}
async function reduceAsync(arr, cb, accumulator) {
  const res = await reduceAsyncUtil(arr, cb, accumulator);
  console.log(res);
  return Promise.all(res.map((val) => {
    if(typeof val === 'function') {
      return val();
    }
    return val;
  })).then((values) => {
    return values;
  })
}
await reduceAsync([a, c, b], (acc, value) => [...acc, value], ['d'])


var reduce = function(iterable, reduceFn, accumulator){
  for(let i of iterable){
    accumulator = reduceFn(accumulator, i)
  }
  return accumulator
}

function reverse(str) {
  if (!str) {
    return ''
  } else {
    return reverse(str.substr(1)) + str[0]
  }
}

function indexOf(array, ele) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if(element === ele) {
      return i;
    }
     return -1;
  }
}

function palindrome(str) {
  let temp = str.split(' ').join('').toLowerCase();
  let i =0;
  let j = temp.length - 1;
  while (i<j) {
    if (temp[i]!== temp[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}

function isBalanced(str) {
  let arr = [];
  for(let i =0; i< str.length; i++) {
    if(str[i] === '{') {
      arr.push('{');
    } else if(str[i] === '}') {
      if (!arr.length) {
        return false;
      }
      arr.pop();
    }
  }
  return arr.length ? false : true;
}

function memoize(fn){
  const cache = {}
  return function(...args){
    if (cache[args]){
      return cache[args];
    }
    cache[args] = fn.apply(null, args);
    return cache[args];
  }
}
var fastFib = memoize(fib2);

function fib2(n) {
  if (n===0 || n===1) {
    return n;
  } else {
    return fastFib(n - 2) + fastFib(n - 1);
  }
}

function seq(array) {
  const promiseArr = array.map((fn) => fn());
  return Promise.all(promiseArr).then((values) => {
    return values;
  })
}

function newFetch(delay) {
  const errorPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error')
    }, delay)
  });
  const successPromise = new Promise((resolve) => {
    fetch('https://jsonplaceholder.typicode.com/todos').then((data) => {
      resolve(data)
    })
  });
  return Promise.race([errorPromise, successPromise]).then((value) => {
    console.log(value)
  });
}

const x = newFetch(1);

