

function createLocalStorage( k, v ) {
    localStorage.setItem(k, v);

    return true;
}

function checkLocalStorage( k ) {
    return localStorage.getItem(k);    
}


function deleteLocalStorage( k ) {
    localStorage.removeItem(k);
}

