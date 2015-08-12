# Given an array_of_ints, find the highest_product you can get from three of the integers.
# The input array_of_ints will always have at least three integers.


array = [-10,-10,1,3,2]

# def get_highest_product(array)
#   sorted_array = array.sort
#   return (sorted_array[-1] * sorted_array[-2] * sorted_array[-3])
# end

# p get_highest_product(array)
#O(nLog(n))


#accounting for negative numbers
def get_max_product(array)
  highest_product_of_three = array[0]*array[1]*array[2]
  highest_product_of_two = array[0]*array[1]
  highest =  array[0]

  lowest_product_of_two = array[0]*array[1]
  lowest = array[0]

  array.each do |current_number|
    highest_product_of_three = [current_number* highest_product_of_two, current_number * lowest_product_of_two, highest_product_of_three].max
    highest_product_of_two   = [current_number * highest, current_number * lowest].max
    highest = [current_number, highest].max
    lowest  = [current_number, lowest].max
  end
  return highest_product_of_three
end


p get_max_product(array)