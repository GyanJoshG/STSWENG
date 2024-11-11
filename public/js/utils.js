const utils = {
    inform: (isError, x) => {
        if(isError) {
            console.error(x);
        } else {
            console.log(x);
        }
    
        alert(x);
    }
}

export default utils;