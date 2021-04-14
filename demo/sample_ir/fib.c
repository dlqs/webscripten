#include <stdio.h>


int fib(int m) {
    if (m <= 1) return 1;
    return fib(m - 1) + fib(m - 2);
}

int main() {
    printf("%d\n", fib(40));
}
