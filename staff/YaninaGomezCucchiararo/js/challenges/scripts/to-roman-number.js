'use strict';

function toRomanNumber(num){
    var numbers = {1: "I", 2: "II", 3: "III", 4:"IV", 5: "V", 6:"VI", 7:"VII", 8:"VIII", 9:"IX", 10:"X"};

    if (typeof num === "number"){
        return numbers[num];
    } else {
        throw Error ('Is not a number');
    }
}