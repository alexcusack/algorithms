
click = lambda do |pair|
          if pair == [41,51]
            exit
          else
            p pair
          end
        end

def clicker(&clicker_block)
  diagnol_index = 1
  loop do
    diagnol_index.times do |index|
      pair = [index, diagnol_index-index]
      clicker_block.call(pair)
    end
    diagnol_index += 1
  end
end

clicker(&click)


# def coordinates(size)
#   list = []
#   size.times do |index|
#     list = list.concat(diagnol(index))
#   end
#   return list
# end


# def diagnol(number)
#   list = []
#   number.times do |index|
#     list << [index, number-index]
#   end
#   return list
# end

# p coordinates(4)