require 'date'

def make_data

	t = Time.new(2015, 12, 14)
	c = 0.75
	prev = rand(1..100)

	for i in (0..11)

		value = (c*prev + (1 - c)*rand(1..100)).round(0)
		puts '{time: "' + (t + i*60*60*2).to_s + '", value: ' + value.to_s + '},'
		prev = value
	end

end

puts "sun"
make_data
puts "water"
make_data
puts "soil"
make_data
puts "temp"
make_data
