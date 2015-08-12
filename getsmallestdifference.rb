# Your task is to
# write a function that finds the minimum value X that makes possible the following: generate a new array that is sorted in strictly ascending order by increasing or decreasing each of the elements of the initial array with integer values in the [0, X] range.
# Example: Having the initial array [5, 4, 3, 2, 8] the minimum value for X is 3. Decrease the first element (5) by 3, decrease the second one (4) by 1, increase the third one (3) by 1, increase the forth one (2) by 3 and do nothing to the last one (8). In the end we obtain the array [2, 3, 4, 5, 8] which is sorted in strictly ascending order.
# print the result X to the standard output (stdout)
# Note that your function will receive the following arguments: v
# which is an array of integers

# find the largest and smallest difference

array = [5,4,3,2,8]

def hill(array)
  largest_number = array[0]
  minimum_change = 0
  array.each do |current_number|
    if current_number > largest_number
      largest_number = current_number
    else
      difference = largest_number - current_number #this is effectively the preceding number
      if difference > minimum_change
        minimum_change = difference
      elsif current_number == minimum_change
        minimum_change += 1
      end
    end
  end
  minimum_change
end

array = [5, 4, 3, 2, 8]
p hill(array) == 3
array = [5, 4, 3, 4, 8]
p hill(array) == 2
array = [3, 3, 2]
p hill(array) #== 2

