#input array of stock prices in order of time
#out put largest differenece
#pay attention to buy/sell times


def get_max_profit(array)
  max_profit = 0
  array.each_with_index do |outer_price, outer_index|
    array.each_with_index do |inner_price, inner_index|
      if inner_price - outer_price > max_profit && outer_index < inner_index
        max_profit = inner_price - outer_price
      end
    end
  end
  return max_profit
end

p get_max_profit(array)
#works in O(n)**2 time
def go_faster(array)
  return if array.length < 2
  max_profit = array[1] - array[0]
  min_price  = array[0]
  array.each do |current_price|
    possible_profit = current_price - min_price

    max_profit = [max_profit, possible_profit].max
    min_price  = [min_price, current_price].min
  end
  return max_profit
end

p go_faster(array)