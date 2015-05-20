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
