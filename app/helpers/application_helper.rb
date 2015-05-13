module ApplicationHelper
  def ce_years
    years = []
    2018.times {|year| years << year }
    years[1..-1].reverse
  end

  def bce_years
    years = []
    468.times {|year| years << year}
    5.upto(13) do |century|
      years.append("early #{century}th century")
      years.append("middle #{century}th century")
      years.append("late #{century}th century")
    end
    years
  end

end
