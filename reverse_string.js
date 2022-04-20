function reverseString_1(string){
    return string.split('').reverse().join('');
};


function reverseString_2(string){
    let resultStr = '';

    for (let i = string.length - 1; i >= 0; i--){
        resultStr += string[i];
    };
    return resultStr
};


function reverseString_3(string){
    let resultStr = '';

    for (let i = 0; i < string.length; i++){
        resultStr = string[i] + resultStr;
    };
    return resultStr
};


function reverseString_4(string){
    let resultStr = '';
    let i = string.length - 1;

    while ( i >= 0){
        resultStr += string[i];
        i--
    };
    return resultStr
};


function reverseString_5(string){
    let resultStr = '';
    let i = string.length - 1;

    do {
        resultStr += string[i];
        i--
    } while ( i >= 0)

    return resultStr
};

function reverseString_6(string){
    let resultStr = '';
    
    string.split('').forEach((value, index, array) => {
        resultStr = value + resultStr;
    })
    return resultStr
};

function reverseString_7(string){
    let resultStr = string.split('').map((value, index, array) => {
        return array[array.length - 1 - index]
    })
    return resultStr.join('')
};

function reverseString_8(string){
    let resultStr = '';

    for (let i in string){
        resultStr = string[i] + resultStr;
    };
    return resultStr
};

function reverseString_9(string){
    let resultStr = '';

    for (let char of string){
        resultStr = char + resultStr;
    };
    return resultStr
};

function reverseString_9(string){
    let resultStr = '';

    for (let char of string[Symbol.iterator]()){
        resultStr = char + resultStr;
    };
    return resultStr
};


console.log(reverseString_1('abcdefg'))
console.log(reverseString_2('abcdefg'))
console.log(reverseString_3('abcdefg'))
console.log(reverseString_4('abcdefg'))
console.log(reverseString_5('abcdefg'))
console.log(reverseString_6('abcdefg'))
console.log(reverseString_7('abcdefg'))
console.log(reverseString_8('abcdefg'))
console.log(reverseString_9('abcdefg'))

