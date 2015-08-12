def getNumberOfPrimes(n)
  range = (2..n).to_a
  primes = []
  range.each do |number|
    primes << number if is_prime?(number)
  end
  return primes.length
end


def is_prime?(number)
  (2...number).each do |div|
    return false if number % div == 0
  end
  true
end


p getNumberOfPrimes(100)