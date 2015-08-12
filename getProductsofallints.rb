# You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.
# Write a function get_products_of_all_ints_except_at_index() that takes an array of integers and returns an array of the products.

# For example, given:

#   [1, 7, 3, 4]
# your function would return:

#   [84, 12, 28, 21]
# by calculating:

#   [7*3*4, 1*3*4, 1*7*4, 1*7*3]
# Do not use division in your solution.

array = [1, 7, 0, 3, 4, 0]

def get_products(array)
  products = []
  array.delete(0) #assuming you want to ignore 0's
  array.each do |number|
    num = array.shift(1)
    products << array.reduce(:*)
    array << num
    array.flatten!
  end
  return products
end


p get_products(array)