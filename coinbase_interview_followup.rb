map = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
    ]

# class Board

#   def initialize(map)
#     @current_cell = [0, 0]
#     @end_point = []
#   end

def find_routes(map)
  destination = [@@map.length-1, @@map[0].length-1]
  return get_routes(destination)
end

def get_routes(position_pair)
  until position_pair[0] == 0 || position_pair[1] == 0
   p above_cell(position_pair)+left_cell(position_pair)
  end
 # p above_cell(position_pair) + left_cell(position_pair)
end

def above_cell(current_cell)
  p "map cell value is: #{@@map[current_cell[0]-1][current_cell[1]]}"
  if @@map[current_cell[0]-1][current_cell[1]] == 0 &&
    get_routes([(current_cell[0]-1), current_cell[1]])
  else
    return @@map[current_cell[0]-1][current_cell[1]]
  end
end

def left_cell(current_cell)
  p "map cell value is: #{@@map[current_cell[0]][(current_cell[1]-1)]}"
  if @@map[current_cell[0]][current_cell[1]-1] == 0
    get_routes([current_cell[0], (current_cell[1]-1)])
  else
    return @@map[current_cell[0]][current_cell[1]-1]
  end
end

p find_routes(@@map)







####finished these four in 20minutes on second time through###

# def fizz(number)
#   array = (1..number).to_a
#   array.each do |number|
#     if number % 15 == 0
#       puts 'fizzbuzz'
#     elsif number % 5 == 0
#       puts "fizzy"
#     elsif number % 3 == 0
#       puts "buzzy"
#     else
#       puts number
#     end
#   end
# end

# # fizz(124)

# def invert_binary(integer)
#   binary_array_string = integer.to_s(2).split('')
#   flipped = flipbits(binary_array_string)
#   convert_binary_to_int(flipped)
# end

# def flipbits(binary_array_string)
#   output_array = []
#   binary_array_string.each do |bit|
#     if bit == "1"
#       output_array << 0
#     else
#       output_array << 1
#     end
#   end
#   output_array
# end


# def convert_binary_to_int(array)
#   length = (array.length)-1
#   value = 0
#   array.each do |bit|
#     if bit == 1
#       value += 2**length
#     end
#     length -= 1
#   end
#   return value
# end

# p invert_binary(124) == 3

# def find_difference(length, difference, array)
#   pairs = []
#   array.each do |number|
#     match = array.find_index(number+difference)
#     if match
#       pairs << [number, array[match]]
#     end
#   end
#   return pairs
# end

# p find_difference(6, 3, [1,4,9,12,7])

# def get_routes(map)
#   row = map.length-1
#   column = map[0].length-1
#   total_moves = row+column
#   return factorial(total_moves)/factorial(row)/factorial(column)
# end

# def factorial(number)
#   range = (1..number).to_a.reverse
#   return range.reduce(:*)
# end

# map = [
#   [1,2,3,4],
#   [1,2,3,4],
#   [1,2,3,4],
#   [1,2,3,4],
# ]

# p get_routes(map)
