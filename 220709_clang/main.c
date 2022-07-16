// 주석

/**************
    여러줄
    주석입니다.
**************/

#include <stdio.h>

// ㅁㄹ 함수이름(매개변수)
// main 은 특별 맨처음 실행되는 함수
int main(int argc, char const *argv[])
{
    // "" : 문자열 -> 배열
    // '' : 문자하나 -> 숫자 (정수)
    char* str = "닥쳐";
    str = "아닌데";
    printf(str);
    return 0;
}