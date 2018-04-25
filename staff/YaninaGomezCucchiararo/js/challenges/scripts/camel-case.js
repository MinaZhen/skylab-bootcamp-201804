'use strict';
function toCamelCase(str){

    if (typeof str !== 'string'){
        throw Error ('Input is not a string');
    }

    if(typeof str === "string"){
        str=str.toLowerCase();
        var arr=str.split(" ");
        for (var i=1; i<arr.length; i++) {
            arr[i]=arr[i].replace(arr[i][0], arr[i][0].toUpperCase())
        }
    return arr.join("");
    } 
}

