#include <stdio.h>

extern double math_log(double);
int main() {
    int a = 0;
    for (int i = 0; i < 10000000; i++) {
        a = math_log(i);
    }
    printf("%d\n", a);
}
