


function checkIfUserExist(email,password,  users){
    let bool = false; 

    for(let user of users)
    {
        if(user.email === email && user.password === password)
        {
            bool = true; 
        }
    }

    return bool; 
}


module.exports = { checkIfUserExist} 