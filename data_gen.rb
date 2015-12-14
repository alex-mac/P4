def make_data

	t = Time.now
	c = 0.5
	prev = rand(1..100)

	for i in (1..72)

		value = (c*prev + (1 - c)*rand(1..100)).round(0)
		puts '{date: "' + (t+60*60*i).to_s + '", value: ' + value.to_s + '},'
		prev = value
	end

end

make_data