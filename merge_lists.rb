# Each order is represented by an "order id" (an integer).
# We have our lists of orders sorted numerically already, in arrays. Write a function to merge our arrays of orders into one sorted array.
# For example:
my_array     = [3, 4, 6, 10, 11, 15]
alices_array = [1, 5, 8, 12, 14, 19]
# prints [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]

def merge_lists(array1, array2)
  sorted = []
  lowest = array1[0]
  array1.times do |index|
    if array1[index] < array2[index]


  end
  return sorted
end




#Test
p merge_lists(my_array, alices_array) == [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]
p merge_lists(my_array, alices_array)