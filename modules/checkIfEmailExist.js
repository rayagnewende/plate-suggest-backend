

function checkIfEmailExist(email, users){
    let bool = false; 

    for(let user of users)
    {
        if(user.email === email)
        {
            bool = true; 
        }
    }

    return bool; 
}


module.exports = { checkIfEmailExist} 