'use strict';
//var input =['JOHN', 'MARY', 'JACK'];
var input = [1,2,3,4,5,6,7,8];
var output = [5,6,7,8];

var newArray =map(input,function(element){

    
    return  element>3;
});
console.log(newArray);


test(function(){
    return map(input,function(element){

                            return  element>4;
    })},
    "map(input, function(element) { return element>3) }) the return should be [5,6,7,8]",
    function(result){

        return input!=result && result.toString() === output.toString() && input.toString()==='1,2,3,4,5,6,7,8';
    }
);


test(withErrorCapturing(function(){
    map();
}),
"map() without arguments should throw an error",
function(result){
   return result.message === "input arr is not an array";
   
});


test(withErrorCapturing(function(){
    map(undefined,
        function(element){
            return  element>4;
});
}),
'map(undefined, function(element) { return  element>4; }) without first argument should throw an error',
function(result){
   return result.message === "input arr is not an array";
   
});


test(withErrorCapturing(function(){
    map(input);
}),
'map(input) without second argument should throw an error',
function(result){
    return result.message === 'input handler is not a function';
   
});