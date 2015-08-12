def get_inversed_numbers(number)
  binary = number.to_s(2)
  return convert_binary_to_int(binary.reverse.to_i)
end

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


p get_inversed_numbers(50) #== 13