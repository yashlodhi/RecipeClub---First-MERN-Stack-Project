#include <stdio.h>

int n, m;

int mergeStates(int *A){
    int s_n=0;
    for(int i=0; i<n; i++){
        if(A[i]>=m){
           s_n++;
            
        }
        else{
            if(i + 1 < n) {
                A[i]=A[i]+A[i + 1];
                n--;
                int j=i+1;
                while(j<n) {
                    A[j] = A[j+1];
                    j++;
                }
            return mergeStates(A);
            }
        }
    }
    return s_n;
}

int main(void) {
	int t;
	scanf("%d", &t);
	
	do{
	    scanf("%d %d", &n, &m);
	    int A[n];
	    
	    for(int i=0; i<n; i++) scanf("%d", &A[i]);
	    
	    int s_n;
        s_n=mergeStates(A);
	    printf("%d\n", s_n);
	    
	    t--;
	}while(t!=0);
	
	return 0;
}

