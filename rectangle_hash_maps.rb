#find area of overlap in rectangles
my_rectangle = {
  x: 1,
  y: 5,
  width: 10,
  height: 4,
}

second = {
  x: 8,  #8
  y: 5,  # 5
  width: 2,
  height: 2,
}

def find_overlap(rectangle1, rectangle2)
  if rectangle1[:x] + rectangle1[:width] > rectangle2[:x]
    x_start = [rectangle1[:x], rectangle2[:x]].max
    x_end   = [rectangle1[:x]+rectangle1[:width], rectangle2[:x]+rectangle2[:width]].min
  end

  if rectangle1[:y] + rectangle1[:height] > rectangle2[:y]
    y_start = [rectangle1[:y], rectangle2[:y]].max
    y_end   = [rectangle1[:y]+rectangle1[:height], rectangle2[:y]+rectangle2[:height]].min
  end

  if !x_start || !y_start
    catch :NoMethodError do
       p "oops! Doesn't look like those rectangles overlap at all"
    end
  end

  return merged_rectange = {
    x: x_start,
    y: y_start,
    width: x_end - x_start,
    height: y_end - y_start,
  }
end

p find_overlap(my_rectangle, second)