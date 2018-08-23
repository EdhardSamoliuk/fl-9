function isPrime(int) {
    for (let i = 2; i < int; i++) {
        if (int % i === 0) {
            return false;
        }
    }
    return int > 1;
}
