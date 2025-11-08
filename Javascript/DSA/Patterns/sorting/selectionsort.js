// function selectionSort(arr) {
// // this approach swaps elements immediately when a smaller element is found,
// // leading to unnecessary multiple swaps and inefficiency. Check the improved version below.
//     for (let i = 0; i < arr.length; i++) {
//         for (j = i; j < arr.length; j++) {
//             if(arr[i] > arr[j]) {
//                 let temp = arr[i];
//                 arr[i] = arr[j];
//                 arr[j] = temp; 
//             }
//         }
//     }
//     return arr;
// }

function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // Swap only once per outer loop
        if (minIdx !== i) {
            let temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
    return arr;
}
let array = [5, 3, 8, 1, 2];
console.log(selectionSort(array)); // Example usage

//generate test cases to analyze the time complexity of the above sorting algorithm
function generateTestCases() {
    const testCases = [];
    
    // Small array
    testCases.push({
        name: 'Small Array',
        data: [5, 3, 8, 1, 2]
    });
    
    // Medium array
    const mediumArray = [];
    for (let i = 0; i < 100; i++) {
        mediumArray.push(Math.floor(Math.random() * 1000));
    }
    testCases.push({
        name: 'Medium Array',
        data: mediumArray
    });
    
    // Large array
    const largeArray = [];
    for (let i = 0; i < 10000; i++) {
        largeArray.push(Math.floor(Math.random() * 10000));
    }
    testCases.push({
        name: 'Large Array',
        data: largeArray
    });
    
    return testCases;
}

const testCases = generateTestCases();
testCases.forEach(testCase => {
    console.time(testCase.name);
    selectionSort(testCase.data);
    console.timeEnd(testCase.name);
});

// Generate worst-case scenario (reverse sorted array) and analyze time complexity
function generateWorstCase(size) {
    const worstCaseArray = [];
    for (let i = size; i > 0; i--) {
        worstCaseArray.push(i);
    }
    return worstCaseArray;
}

const worstCaseArray = generateWorstCase(10000);
console.time('Worst Case Array');
selectionSort(worstCaseArray);
console.timeEnd('Worst Case Array');