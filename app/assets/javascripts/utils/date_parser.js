Cicadas.DateParser = {

  months: ["January", "February", "March", "April",
              "May", "June", "July", "August", "September",
              "October", "November", "December"],

  parseDate: function (date) {
    //new Date(year, month, day) integers
    if (date.year === "") {
      return null;
    }
    else if (date.month === "") {
      return new Date(date.year);
    }
    else if (date.day === "") {
      return new Date(date.year, date.month);
    }
    else {
      return new Date(date.year, date.month, date.day);
    }
  },

  // def date_parser(date_hash)
  //   return nil if date_hash[:year] == ''
  //   return Date.new(date_hash[:year].to_i) if date_hash[:month] ==''
  //   if date_hash[:day] == ''
  //     return Date.new(date_hash[:year].to_i, date_hash[:month].to_i)
  //   else
  //     Date.new(date_hash[:year].to_i, date_hash[:month].to_i, date_hash[:day].to_i)
  //   end
  // end


  ce_years: function () {
    years = []
    for (var i = 0; i < 2018; i++) {
      years.unshift(i);
    }
    return years;
  },


  bce_years: function () {
    for (var i = 0; i < 468; i++) {
      years.push(i);
    }
    for (var i = 5; i > 0; i--) {
      years.push("early" + i + "th century");
      years.push("middle" + i + "th century");
      years.push("late" + i + "th century");
    }
    return years;
  },
}
