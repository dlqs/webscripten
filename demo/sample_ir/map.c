#include <stdio.h>

int id(int i) {
    return i;
}

extern double* map(double[], double (*)(double));
extern double math_sin(double);

int main() {
    double arr[] = {1.0, 2.0, 3.0};
    double *arr2 = map(arr, math_sin);
    printf("%lf\n", arr2[1]);
}
