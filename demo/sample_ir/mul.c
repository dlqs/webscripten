#include <stdio.h>

int main() {
    int a = 0;
    for (int i = 0; i < 10000000; i++) {
        a++;
    }
    printf("%d\n", a);
}
