# "Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead
# of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and
# five print “FizzBuzz”."


array = (1..100).to_a

def convert(array)
  array.map! do |num|
    if num % 15 == 0
      num = "FizzBuzz"
    elsif num % 5 == 0
      num = "Buzz"
    elsif num % 3 == 0
      num = "Fizz"
    else
      num = num
    end
  end
  return array
end


p convert(array)

#Test


