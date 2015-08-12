# Your company built an in-house calendar tool called HiCal. You want to add a feature to see the times in a day when everyone is available.
# To do this, you’ll need to know when any team is having a meeting. In HiCal, a meeting is stored as a tuple of integers (start_time, end_time). These integers represent the number of 30-minute blocks past 9:00am.

# For example:

# (2, 3) # meeting from 10:00 – 10:30 am
# (6, 9) # meeting from 12:00 – 1:30 pm
# Write a function condense_meeting_times() that takes an array of meeting time ranges and returns an array of condensed ranges.

# For example, given:

# [(0, 1), (3, 5), (4, 8), (10, 12), (9, 10)]
# your function would return:

# [(0, 1), (3, 8), (9, 12)]
########
#Psuedo
# covert each pair to a numeric range
# combine all the ranges
# remove non unique



array = [[0, 1], [3, 5], [4, 8], [10, 12], [9, 10]]
# array =   [[1, 3], [2, 4]]

def merge_meetings(array)
  sorted = array.sort{|a,b| a[0] <=> b[0]}
  previous_meeting_start, previous_meeting_end = sorted[0]
  merged_meeting = []
  sorted.each do |current_meeting|
    if previous_meeting_end >= current_meeting[0]
      previous_meeting_end = [current_meeting[1], previous_meeting_end].max
    else
      merged_meeting << [previous_meeting_start, previous_meeting_end]
      previous_meeting_start, previous_meeting_end = current_meeting
    end
  end
   merged_meeting << [previous_meeting_start, previous_meeting_end]
   return merged_meeting
end

p merge_meetings(array)