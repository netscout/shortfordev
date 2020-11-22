function range(start = 0, end = Infinity, step = 1) {
    let result = []

    for(let i = start; i < end; i += step) {
        result.push(i);
    }

    return result;
}

function *range2(start = 0, end = Infinity, step = 1) {
    for(let i = start; i < end; i += step) {
        yield i;
    }
}

for(num of range(5, 10)) {
    console.log(num);
}

function checkMemory(func) {
    const beforeKB = memoryUsedKB();
    console.log("memory before: ", beforeKB);

    let sum = 0;
    for(let i of func(0, 10000)) {
        sum += i;
    }

    console.log("sum: ", sum);

    const afterKB = memoryUsedKB();
    console.log("memory after: ", afterKB);

    const diffKB = afterKB - beforeKB;
    console.log("memory diff: ", diffKB);
}

function memoryUsedKB() {
    return Math.round(process.memoryUsage().heapTotal * 100 / 1024) / 100;
}

checkMemory(range);
checkMemory(range2);