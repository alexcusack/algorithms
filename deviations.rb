# Given an array of integer elements and an integer d please consider all the sequences of d consecutive
# elements in the array. For each sequence we compute the difference between the maximum and the minimum
# value of the elements in that sequence and name it the deviation.
# Your task is to
# write a function that computes the maximum value among the deviations of all the sequences considered above
# print the value the standard output (stdout)
# Note that your function will receive the following arguments:
# v
# which is the array of integers
# d
# which is an integer value giving the length of the sequences
# Data constraints
# the array will contain up to 100,000 elements
# all the elements in the array are integer numbers in the following range: [1, 231 -1]
# the value of d will not exceed the length of the given array
# Efficiency constraints
# your function is expected to print the result in less than 2 seconds
# Example
# Input Output
# v: 6, 9, 4, 7, 4, 1
# d: 3
# 6
# Explanation
# The sequences of length 3 are:
# 6 9 4 having the median 5 (the minimum value in the sequence is 4 and the maximum is 9)
# 9 4 7 having the median 5 (the minimum value in the sequence is 4 and the maximum is 9)
# 7 4 1 having the median 6 (the minimum value in the sequence is 1 and the maximum is 7)
# The maximum value among all medians is 6
# input = range, array
# find the largest median between a set of ranges
# for each number, get the sub squence number..i. track the lowest in that subsquence, and the higest.

require 'benchmark'
array = [6, 9, 4, 7, 4, 1]
range = 3

def get_deviation(range, array)
  max = array[0]
  min = array[0]
  median = nil
  series = []
  array.each_with_index do |number, index|
    series = array[index..(index+range-1)]
    return max-(min.abs) if series.length < range
    if series.last > max || series.last < min
      max = series.max
      min = series.min
    end
  end
  return max-(min.abs)
end

array = [6, 9, 4, 7, 4, -1]
range = 3
p get_deviation(range, array)

array = [-1, 4, 10, 25, 1000, 1]
range = 4
p get_deviation(range, array)