#find number of unique paths from top left to bottom right
# map = [
#   [0,0,0,0,0],
#   [0,0,0,0,0],
#   [0,0,0,0,0]
# ]

# rows = map.lenght # 3
# columns = maps[0].length #5

# def find_paths(m, n)
#   return 1 if m == 1 || n == 1
#   rows = m-1
#   columns = n-1
#   row_factorial = (1..rows*2).to_a.reverse
#   columns_factorial = (1..columns).to_a.reverse
#   factorial_row = row_factorial.reduce(:*)
#   factorial_column = columns_factorial.reduce(:*)
#   return factorial_row/(factorial_column*factorial_column)
# end

def find_paths(rows, columns)
  return 1 if rows == 1 || columns == 1
  total_moves = rows + columns
  possiblities = factorial(total_moves)/factorial(rows)/factorial(columns)
  return possiblities
end

def factorial(number)
  range = (1..number).to_a.reverse
  return range.reduce(:*)
end


puts
p "Factorial Test"
p factorial(6)  == 720
p factorial(4)  == 24
p factorial(10) == 3628800
puts
p "Begin routes tests"
p find_paths(6, 2) == 28
p find_paths(4, 4) == 70
p find_paths(8, 2) == 45
p find_paths(7, 2) == 36
p find_paths(60, 20) == 3535316142212174320
p find_paths(100, 90) == 69815264740244873283501787880835665327034164903689363110
p find_paths(3, 2) #== 10
puts


