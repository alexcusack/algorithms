# ### completed all 4 challenges in 9mins

# fizzbuzz
def boohoo(number)
  array = (1..number).to_a
  array.each do |num|
    if num % 15 == 0
      puts "boohoo"
    elsif num % 5 == 0
      puts "boo"
    elsif num % 3 == 0
      puts "hoo"
    else
      puts num
    end
  end
end

p boohoo(64)

# find difference

def find_pairs(difference, array)
  pairs = []
  array.each do |number|
    match = array.find_index(number+difference)
    if match
      pairs << [number, array[match]]
    end
  end
  return pairs
end

p find_pairs(3, [1,3,4,6,8,7])

# binary flip

def binary_flip(number)
  binary_array = number.to_s(2).split('')
  binary_array.map! do |bit|
    if bit == "1"
      bit = 0
    else
      bit = 1
    end
  end
  length = binary_array.length-1
  value = 0
  binary_array.each do |bit|
    if bit == 1
      value += 2 ** length
    end
    length-=1
  end
  return value
end

p binary_flip(234) == 21


# find routes

map = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
    ]


def find_routes(map)
  row = map.length-1
  column = map[0].length-1
  total_moves = row+column
  factorial(total_moves)/factorial(column)/factorial(row)
end

def factorial(number)
  (1..number).to_a.reverse.reduce(:*)
end

p find_routes(map)
