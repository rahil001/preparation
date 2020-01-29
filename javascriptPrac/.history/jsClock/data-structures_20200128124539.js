
// max of sum of during all rotations i*array[i]
function getmaxRotationalSum (array) {
    let totalArraySum = 0;
    let currSum;
    let n = array.length;
      for (let index = 0; index < n; index++) {
        const element = array[index];
        totalArraySum+=element;
        currSum+= index*array[index];  
      }
  
      maxSum = currSum;
      for (let i = 1; i < n; i++) {
        currSum = currSum + totalArraySum - n* array[n - i];
        if(currSum > maxSum) {
          maxSum = currSum;
        }
      }
      return maxSum;
  }
  getmaxRotationalSum([10, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // max contigous subArray

  function maxSumContigous () {
     let maxSum = 0;
     let maxEndingHere = 0;
     let start =0, end = 0, s=0;
     for (let i = 0; i < array.length; i++) {
         const element = array[i];
         maxEndingHere = maxEndingHere + element;
         if(maxEndingHere < 0) {
             maxEndingHere = 0;
             s = index + 1;
         }
         if(maxSum < maxEndingHere) {
             maxSum = maxEndingHere;
             start = s;
             end = index;
         }
         
     }
     return maxSum;
  }
// sort 0, 1, 2
function sort012(a, arr_size)
{
    let lo = 0; 
    let hi = arr_size - 1; 
    let mid = 0; 
  
    while (mid <= hi) 
    { 
        switch (a[mid]) 
        { 
        case 0: 
            swap(a[lo++], a[mid++]); 
            break; 
        case 1: 
            mid++; 
            break; 
        case 2: 
            swap(a[mid], a[hi--]); 
            break; 
        }
    }
}
// max sum such that no 2 elements are adjacent

function maxSum(array) {
    let excl = 0 // max sum excluding previous sum
    let incl = array[0]; // max sum including previous sum

    for (let i = 1; i < array.length; i++) {
        const element = array[i];
        const excl_new = Math.max(excl, incl);
        incl = element + excl_new;
        excl = Math.max(incl, excl_new);
    }
    return Math.max(incl, excl);
}

// rearrange negative and positive numbers
function rearrange(arr) {
    var j = -1;
    for(var i =0; i < arr.length; i++) {
        if (arr[i] < -1) {
            j++;
            let temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
    }
    neg = 0;
    pos = j + 1;
    while((neg < pos) && (pos < arr.length) && arr[neg] < 0) {
        let temp = arr[neg];
            arr[neg] = arr[pos];
            arr[pos] = temp;
            neg+=2;
            pos++;
    }
}

// fibonacci
function name(n) {
    if(n === 0 || n === 1) {
      return n;
    }
    if(n >= 2) {
      return name(n-1) + name(n-2);
    }
  }

  function HashMap() {
      this.obj = {};
      this.set = function(objName, value) {
             this.obj[objName]=value; 
      }
      this.get = function(objName){
            return this.obj[objName];
      }
  }

  function HashMapWithoutObj() {
    this.arr = [];
    this.set = function(objName, value) {
           this.arr.push([objName, value]); 
    }
    this.get = function(objName){
        this.arr.forEach(element => {
            if (element[0] === objName) {
               return element[1]         
            }
        });
    }
}

function debounce(fn ,delay) {
    var timer;
    return function() {
        let context = this;
        let args = arguments;    
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.call(context, args);    
        }, delay)
    }
}

function permutate(str) {
    for (let i = 0; i < str.length; i++) {
        const element = str[i];
        permutateRest(i, str);
        
    }
}

function permut(string) {
    var permutations = [];
    if (string.length < 2) 
        return string; // This is our break condition
        
    for (var i=0; i<string.length; i++) {
        var char = string[i];

        // Cause we don't want any duplicates:
        if (string.indexOf(char) != i) // if char was used already
            continue;

        var remainingString = string.slice(0, i) + string.slice(i+1, string.length); //Note: you can concat Strings via '+' in JS
        for (var subPermutation of permut(remainingString))
            permutations.push(char + subPermutation)

    }
    return permutations;
}

function seq(array) {
    let temp =[];
    array.map(function(promise) {
        promise().then(function(val){
            temp.push(val);    
        });
    })
}
let a = () => Promise.resolve('a')
let b = () => Promise.resolve('b')
let c = () => Promise.resolve('c')
await seq([a, b, c])

adder = {
	base : 1,
	add : function(a){
		 function f(v) {
			return v + this.base
		};
		return f(a);
    }
}
adder.add(1);

function subArrayEqualToSum (array , sum) {
    let currSum = array[0];
    let start = 0;
    for(let i=1; i<array.length; i++) {
        currSum+=array[i];
        while (currSum > sum && start < i - 1) {
            currSum-=array[start];
            start++;
        }
        if (currSum === sum) {
            return {
                start,
                end: i - 1
            }
        }
    }
    return 'Not Found'
}
function waterTrapping(array) {
    let res = 0;
    let len = array.length;
    let left_max = 0, right_max = 0;
    let low =0, high = len - 1;
    while(low <= high) {
        if (array[low] < array[high]) {
            if (array[low] > left_max) {
                left_max = array[low];
            } else {
                res+=left_max - array[low];
                low++;
            }
        } 
        else {
            if (array[high] > right_max) {
                right_max = array[high];
            } else {
                res+= right_max - array[high];
                high--;
            }
        }
    }
    return res;
}


function substr(array) {
    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j <= array.length - i; j++) {
            console.log(array.substr(i, j))    
        }
        
    }
}

let max_len = 1;
let cur_len = 1;
const hash = {};
let prev_index = -1;
hash[[0]] = 0;
for (let i=1; i<str.length; i++) {
    prev_index = typeof hash[str[i]] === 'undefined' ? -1 : hash[str[i]];
    // not present and not part of NRCS
    if( prev_index === -1 || i - cur_len > prev_index) {
        cur_len++;
    } else {
        if (cur_len > max_len) {
            max_len = cur_len;
        }
        cur_len = i - prev_index;
    }
    hash[str[i]] = i;
}

function Tree (data) {
    this.data = data;
    this.left = null;
    this.right = null;
}
const root = new Tree(1);
root.left = new Tree(2);
root.right = new Tree(3);
root.left.left = new Tree(4);
root.left.right = new Tree(5);
root.right.right = new Tree(7);
root.right.left = new Tree(6);
function HeightTree(root) {
    if(root === null) {
        return 0;
    }
    left = HeightTree(root.left);
    right = HeightTree(root.right);

    return Math.max(left, right) + 1;
}

for(let i=1; i <= HeightTree; i++) {
    storeNodes(root, i);
}

function storeNodes(root, level) {
    if(level === 1) {
        res.push(root);
    }
    if(root.left) {
        storeNodes(root.left, level - 1);
    }
    if(root.right) {
        storeNodes(root.right, level - 1);
    }
}

function findRepeated(array) {
    for (let index = 0; index < array.length; index++) {
        if (array[index] < 0) {
            array[index] = -array[index];
        }
         if (array[array[index] - 1] < 0) {
            return array[index];
         }
         array[array[index]] = -array[array[index]];
    }
}