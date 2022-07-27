let input = [43,2,24,3,65,32,3,56]

//output [2,3,3,5,24,32,43,56,65]

function mergesort(input){
    if(input.length == 1) return input;
    else{
        let midpoint = parseInt(input.length/2);

        let set1 = mergesort(input.slice(0, midpoint));
        let set2 = mergesort(input.slice(midpoint));

        return merge(set1, set2);
    }
}

function merge(set1, set2){
    let result = [];
    let val;
    while(set1.length && set2.length){
        val = set1[0] < set2[0] ? set1.shift() : set2.shift();
        result.push(val);
    }

    if(set1.length){
        result.push(...set1);
    }
    else{
        result.push(...set2);
    }
    return result;
}

let sortedResult = mergesort(input);
console.log(sortedResult);
