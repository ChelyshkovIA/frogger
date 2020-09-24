function validateWord(word) {
    let val = word.split('');
    val[0] = val[0].toUpperCase();
    val = val.join('');
    return val;
}

export {
    validateWord
} 
    