// #anagrams
// # Your task is to write a function that determines for each pair if it’s an anagram or not
// # for each pair of words your function will print to standard output (stdout) the value 1 if the
// # pair is an anagram or 0 otherwise (one result per line) Note that your function will receive the
// # Following arguments:
// # firstWords-- which is an array of strings giving the first word for each of the pairs
// # secondWords-- which is an array of strings giving the corresponding second word


first_words =  ['cinema', 'host', "aba", "train"]
second_words = ["iceman", "shot", "bab", "rain"]

def check_for_anagrams(first_words, second_words)
  Argumenterror.new("Arrays must be the same length") if first_words.length != second_words.length
  first_words.each_with_index do |word, index|
    if word.chars.sort == second_words[index].chars.sort
      p 1
    else
      p 0
    end
  end
end

p check_for_anagrams(first_words, second_words)