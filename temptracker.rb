class TempTracker
  def initialize
    @temperatures = []
    @max  = 0
    @min  = nil
    @mean = nil
    @mode = {count: 0, temperature: nil}
    @mode_tracker = Hash.new(0)
  end


  def insert(temperature)
    @min  = temperature if !@min
     = temperature if !@mean

    @temperatures.push(temperature)

    if temperature > @max
      @max = temperature
    elsif temperature < @min
      @min = temperature
    end

    @mode_tracker[temperature] += 1
    if @mode_tracker[temperature] > @mode[:count]
      @mode[:count] = @mode_tracker[temperature]
      @mode[:temperature] = temperature
    end
    @mean =
  end

  def get_max
    @max
  end

  def get_min
    @min
  end

  def get_mean
    @mean
  end

  def get_mode
    @mode[:temperature]
  end

end


###Test
thermo = TempTracker.new
thermo.insert(98)
p thermo.get_max == 98
thermo.insert(9)
thermo.insert(9)
thermo.insert(100)
p thermo.get_max  == 100
p thermo.get_min  == 9
p thermo.get_mode == 9