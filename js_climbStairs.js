

function countMoves (n) {
  if (n <= 2) { return n }
  var count = []
  count[0] = 0
  count[1] = 1
  count[2] = 2
  for (var i = 3; i < n; ++i){
    count[i] = count[i-1] + count[i-2]
  }
  return count[n]
}

console.log(countMoves(1))
console.log(countMoves(2))
console.log(countMoves(3))
console.log(countMoves(4))
console.log(countMoves(5))
console.log(countMoves(6) === 13)
// console.log(countMoves(44))


class Solution {
public:
    int climbStairs(int n) {
        if(n==1) return 1;
        if(n==2) return 2;
        int count[n+1];
        count[0]=0;
        count[1]=1;
        count[2]=2;
        for(int i=3;i<=n;i++)
            count[i]=count[i-1]+count[i-2];
        return count[n];
    }
};