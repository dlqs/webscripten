#include <stdio.h>
extern double math_sin(double);
int main() {
  printf("Hello world!\n");
  printf("The sin of 0.75 is %.3lf!\n", math_sin(0.75));
  return 0;
}

