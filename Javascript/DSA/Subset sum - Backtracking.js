function subSetSum(arr, sum){
    let result = [];
    backtrack(0, sum, arr, 0, [], result);
    return result;
}

function backtrack(acc, sum, arr, index, stack, result){
    if(acc === sum){
        result.push(stack);
        return;
    }

    if(index >= arr.length || acc > sum){
        return;
    }
    else{
        backtrack(acc + arr[index], sum, arr, index+1, [...stack, index], result);
        backtrack(acc, sum, arr, index+1, stack, result);
    }
        
}
   
let result = subSetSum([4,32,2,35,67,3,53,5], 39);
console.log(result);
