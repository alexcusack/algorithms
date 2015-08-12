 # return 1 if the braces in the string match.
 # return 0 if they don't.

 array = [ ")(){}", "[]({})", "([])", "{()[]}", "([)]" ]


 def check_for_matches(array)
  matches = {
    "{" => "}",
    "[" => "]",
    "(" => ")",
  }
  array.each do |set|
    stack = []
    set.chars.each do |brace|
      brace == matches[stack[-1]] ? stack.pop : stack.push(brace)
    end
    puts (stack.empty? ? 1 : 0)
  end
 end



 p check_for_matches(array)