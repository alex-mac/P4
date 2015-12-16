def make_data

	t = Time.new(2015, 11, 7)
	c = 0.5
	prev = rand(1..100)

	for i in (0..11)

		value = (c*prev + (1 - c)*rand(1..100)).round(0)
		puts '{time: "' + (t+60*60*i *2).to_s + '", value: ' + value.to_s + '},'
		prev = value
	end

end

make_data

puts("soil")

make_data

puts("/////////")

make_data

puts("/////////")

make_data