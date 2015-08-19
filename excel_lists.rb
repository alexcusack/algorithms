def convert(letters)
  key = {
   "A" =>  0,
   "B" =>  1,
   "C" =>  2,
   "D" =>  3,
   "E" =>  4,
   "F" =>  5,
   "G" =>  6,
   "H" =>  7,
   "I" =>  8,
   "J" =>  9,
   "K" => 10,
   "L" => 11,
   "M" => 12,
   "N" => 13,
   "O" => 14,
   "P" => 15,
   "Q" => 16,
   "R" => 17,
   "S" => 18,
   "T" => 19,
   "U" => 20,
   "V" => 21,
   "W" => 22,
   "X" => 23,
   "Y" => 24,
   "Z" => 25,
  }
  column_index = 0
  letters = letters.chars
  while letters.length > 1
    character = letters.shift.upcase
    column_index += key[character]*26
    column_index += 26 if character == "A"
  end
  column_index += key[letters[0].upcase]
  return column_index
end


p convert('B')  == 1
p convert('AC') == 28
p convert('BA') == 52
p convert('a')  == 0
p convert('ac') == 28
puts


def convert_index_to_letters(index)
  key = [
    [25, "A"],
    [24,  "B"],
    [23,   "C"],
    [22,    "D"],
    [21,     "E"],
    [20,      "F"],
    [19,       "G"],
    [18,        "H"],
    [17,         "I"],
    [16,          "J"],
    [15,            "K"],
    [14,              "L"],
    [13,                "M"],
    [12,                "N"],
    [11,              "O"],
    [10,            "P"],
    [9,           "Q"],
    [8,          "R"],
    [7,         "S"],
    [6,        "T"],
    [5,       "U"],
    [4,      "V"],
    [3,     "W"],
    [2,    "X"],
    [1,   "Y"],
  ]
  column_letters = ""
  key.each do |set|
    remainder, index = index.divmod(set[0])
    remainder.times{column_letters.concat(set[1])} if remainder > 1
  end
  p index
  return column_letters
end

p convert_index_to_letters(52)


