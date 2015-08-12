# # You will be given a list of 32-bits unsigned integers. You are required to output the list of the unsigned
# # integers you get by flipping bits in its binary representation (i.e. unset bits must be set, and set bits must
# # be unset). Input Format
# # The first line of the input contains the list size T. T lines follow each line having an integer from the list.

# # Constraints
# # 1 ≤ T ≤ 100

# # Output Format
# # Output one line per element from the list with the requested result.
# # Sample Input
# # 3 2147483647 1 0
# # Sample Output
# # 2147483648 4294967294 4294967295
# # Explanation
# # Take 1 for example, as unsigned 32-bits is 00000000000000000000000000000001
# # and doing the flipping we get 11111111111111111111111111111110 which in turn is 4294967294


# def flipbits(number)
#   binary_array = Array.new(32,0)
#   number_to_binary = number.to_s(2).split('')
#   binary_array <<  number_to_binary
#   p binary_array.flatten!
#   p binary_array[(number_to_binary.length)..-1].join()
#   binary_number = binary_array[(number_to_binary.length)..-1]
#   binary_number.map! do |bit|
#     if bit.to_i == 1
#       bit = 0
#     elsif bit.to_i == 0
#       bit = 1
#     end
#   end
#   p binary_number.join()
#   return convert_binary_to_int(binary_number.join().to_i)
# end

# def convert_binary_to_int(binary)
#   binary_array = binary.to_s.chars
#   length = binary_array.length-1
#   value = 0
#   binary_array.each do |bit|
#     if bit == "1"
#       value += 2**length
#     end
#     length -= 1
#   end
#   return value
# end

# p flipbits(1)  == 4294967294
# p flipbits(39) == 4294967256
# p flipbits(100) #== 27