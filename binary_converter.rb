# Reverse bits of a given 32 bits unsigned integer.
# For example, given input 43261596 (represented in binary as 10100101000001111010011100),
# return 964176192 (represented in binary as 00111001011110000010100101).

# Follow up:
# If this function is called many times, how would you optimize it?

#convert number to binary.
#reverse binary array
#convert number to int.


def convert_binary_to_int(binary)
  binary_array = binary.to_s.chars
  length = binary_array.length-1
  value = 0
  binary_array.each do |bit|
    if bit == "1"
      value += 2**length
    end
    length -= 1
  end
  return value
end


#Long form conversion to binary
# def convert_to_binary(number, string=Array.new(Math.sqrt(number).to_i,0))
#   test_number    = 1
#   working_number = 1
#   until number/(test_number**2) < 1
#     working_number = test_number
#     test_number += 1
#   end
#   string[working_number] = 1
#   number = number - working_number**2
#   if number != 1
#     convert_to_binary(number, string)
#   else
#     string[0] = 1
#     return string.reverse.join()
#   end
# end

# def convert_to_binary2(number, binary_array=Array.new(Math.sqrt(number).to_i,0))
#   binary_array[Math.sqrt(number)] = 1
#   number = number - Math.sqrt(number).to_i**2
#   if number != 1
#     convert_to_binary2(number, binary_array)
#   else
#     binary_array[0] = 1
#     return binary_array.reverse.join()
#   end
# end

def solve(number)
  binary = number.to_s(2)
  return convert_binary_to_int(binary.reverse.to_i)
end

###################################
########### TESTS #################
###################################
p "convert from Binary"
p convert_binary_to_int(10111) == 23
p convert_binary_to_int(101111111) == 383
p convert_binary_to_int(00000) == 0
p convert_binary_to_int(1111)  == 15

# p "Convert to Binary"
# p convert_to_binary(23)       == "10111"
# p convert_to_binary_fast(383) == "101111111"

p "Full solve"
p solve(43261596) == 15065253