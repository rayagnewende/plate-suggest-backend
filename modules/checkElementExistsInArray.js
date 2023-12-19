


function checkIfElementExistsInArray(element, array){
    let bool= false; 
    for(let i= 0; i<array.length; i++)
    {
        if(element.dish_name === array[i].dish_name)
         bool = true;  
    }

    return bool; 
}


module.exports = { checkIfElementExistsInArray}