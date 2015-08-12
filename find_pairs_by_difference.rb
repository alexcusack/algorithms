# Given an unsorted array and a number n, find if there exists a pair of elements in the array
# whose difference is n.

array = [5, 20, 3, 2,1,4,7,8,9,4,1,3,4,5,7,8,9,4,1,3,4,5,7,8,9,4,1,3,4,5,7,8,9,4,1,3,4,5,7,8,9,4,1,3,4,5,]
number = 1

def find_pairs(array, number)
  pairs = []
  array.each do |base|
    array.each do |compared|
      pairs << [base, compared] if base + number == compared
    end
  end
  pairs
end


#for speed
def find_difference_alt(array, number)
  pairs = []
  i = 0
  while i < array.length do
    match = array.find_index(array[i] + number)
    pairs << [array[i], array[match]] if match
    i += 1
  end
  pairs
end



start = Time.now
p find_pairs(array,number)
finish = Time.now
p "Mark I took #{(finish - start)*1000} milliseconds"
start = Time.now
p find_difference_alt(array,number)
finish = Time.now
p "Mark II took #{(finish - start)*1000} milliseconds"

