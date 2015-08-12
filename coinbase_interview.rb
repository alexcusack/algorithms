# def boo_hoo(number)
#   array = (1..number).to_a
#   array.map! do |number|
#     if number % 15 == 0
#       number = "BooHoo"
#     elsif number % 5 == 0
#       number = "Hoo"
#     elsif number % 3 == 0
#       number = "Boo"
#     else
#       number = number
#     end
#   end
#   return array.each{|number| puts number}
# end

# ######################################################################
# def inverted_binary(number)
#   binary_number = number.to_s(2)
#   flipped_binary = flip_bits(binary_number)
#   return convert_binary_to_int(flipped_binary)
# end

# def flip_bits(binary_string)
#   array = binary_string.split('')
#   array.map! do |bit|
#     if bit == "1"
#       bit = 0
#     elsif bit == "0"
#       bit = 1
#     end
#   end
#   return array.join()
# end

# def convert_binary_to_int(binary)
#   value = 0
#   binary_array = binary.to_s.chars
#   length = binary_array.length-1
#   binary_array.each do |bit|
#     if bit == "1"
#       value += 2**length
#     end
#     length -= 1
#   end
#   return value
# end




# p inverted_binary(100)

def find_number_of_pairs(length, difference, array_of_numbers)
  pairs = []
  i = 0
  while i < length do
    match = array_of_numbers.find_index(array_of_numbers[i] + difference)
    pairs << [array_of_numbers[i], array_of_numbers[match]] if match
    i += 1
  end
  pairs
end


p find_number_of_pairs(6, 3, [1,2,3,4,5,8,12,15])


# def numberOfRoutes(a)
#   rows = a.length-1
#   columns = a[0].length-1
#   total_possible_moves = rows+columns
#   return get_factorial(total_possible_moves)/get_factorial(rows)/get_factorial(columns)
# end


# def get_factorial(number)
#   range = (1..number).to_a.reverse
#   range.reduce(:*)
# end

# map = [
#       [1,2,3,4],
#       [1,2,3,4],
#       [1,2,3,4],
#       [1,2,3,4],
#       ]


# p numberOfRoutes(map)

