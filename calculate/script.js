
$(document).ready(function() {
    $('.number').click(numberPress);
    $('.operator').click(operatorPress);
    $('.equal').click(equalHandler);
    $('.clear').click(clearHandler);
    $('.decimal').click(decimalHandler);
});

var valueArray = [''];
var i = 0;
var lastOp = null;
var lastNum = null;

function numberPress(){
    var value = $(this).text();
    valueArray[i] += value;
    $('.display').text(valueArray[i]);
}

function decimalHandler(){
    var value = $(this).text();
    var decimal = valueArray[valueArray.length-1];
    var decimalString = decimal.indexOf('.');
        if (decimalString === -1){
            valueArray[i]+=value;
            $('.display').text(valueArray[i]);
        } else{
            return;
        }
    }

function operatorPress(){
    var operator = $(this).text();
    //if operator first thing pressed exit out of function
    if (valueArray[0]==='') {
        return;
    }
    // if second number spot empty - place operator in second slot in array - exit function
   if (valueArray[2]==='') {
       valueArray[1] = operator;
        return;
    }
    //if two numbers and operator present store last operator pressed -- call doMath function
    if(valueArray.length===3 && valueArray[2]!==''){
       // lastOp = $(this).text();
       // lastNum = valueArray[2];
       doMath(valueArray[1]);
       valueArray[1] = $(this).text();
       // lastOp = valueArray[1];
       // valueArray[1] = lastOp;
       valueArray.push('');
       i = 2;
       return;
    }

 //move i 2 spots // push operator and open string - if number operator and number are there calculate
    valueArray[1] = operator;
    valueArray[2] = '';
    i+=2;
    if(valueArray[2]!== '') {
        doMath(operator);
    }
}

function equalHandler(){
    if (valueArray[1] == "") {
        var operator = lastOp;
        valueArray[2] = lastNum;
    } else {
        var operator = valueArray[1];
    }

    // if (lastOp !== null && lastNum !== null){
    //     valueArray[2] = lastNum;
    //     valueArray[1] = lastOp;
    //     doMath(lastOp);
    // }
    //if equal first thing pressed display 0 - and exit function
    if(valueArray[0]===''){
        $('.display').text('0');
        return;
    }
    // if array has one number display text in first spot - exit function
    if(valueArray.length===1){
        $('.display').text(valueArray[0]);
        return;
    }
    // if array has number and operator and the third spot doesn't have a number the second number is the same as the first
    //number
    if(valueArray[2] ===''){
        valueArray[2] = valueArray[0];
    }
    //run doMath function
    doMath(operator);
}

function doMath(operator) {
    if(valueArray.length === 1 && lastNum !== null && lastOp !== null){
        var num2 = parseFloat(lastNum);
        operator = lastOp;
    } else {
        var num1 = parseFloat(valueArray[0]);
        var num2 = parseFloat(valueArray[2]);
    }
//if dividing by zero return error reset valueArray to empty string, and i to zero
    if (operator==='/' && num2===0){
        $('.display').text('error');
        valueArray =[''];
        i=0;
        return;
    }

    var result = null;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case'-':
            result = num1 - num2;
            break;
        case 'x':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
    }
   //reset valueArray, set i to 0 first place is equal to string result push empty string -display result
        lastOp = operator;
        lastNum = num2;
        valueArray = [''];
        i=1;
        valueArray[0]=result+'';
        valueArray.push('');
        $('.display').text(result);
    // }
}

function clearHandler(){
    valueArray=[''];
    i=0;
    $('.display').text(0);
}
