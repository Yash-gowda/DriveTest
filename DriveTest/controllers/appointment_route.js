module.exports = (req, res) => {
    //time slots for booking
    const time = [
      {
        value: "9:00",
        display: "9:00-9:30",
        disabled: false,
      },
      {
        value: "9:30",
        display: "9:30-10:00",
        disabled: false,
      },
      {
        value: "10:00",
        display: "10:00-10:30",
        disabled: false,
      },
      {
        value: "10:30",
        display: "10:30-11:00",
        disabled: false,
      },
      {
        value: "11:00",
        display: "11:00-11:30",
        disabled: false,
      },
      {
        value: "11:30",
        display: "11:30-12:00",
        disabled: true,
      },
      {
        value: "12:00",
        display: "12:00-12:30",
        disabled: false,
      },
      {
        value: "12:30",
        display: "12:30-1:00",
        disabled: false,
      },
      {
        value: "1:00",
        display: "1:00-1:30",
        disabled: false,
      },
      {
        value: "1:30",
        display: "1:30-2:00",
        disabled: false,
      },
      {
        value: "2:00",
        display: "2:00-2:30",
        disabled: false,
      },
      {
        value: "2:30",
        display: "2:30-3:00",
        disabled: false,
      },
      {
        value: "3:00",
        display: "3:00-3:30",
        disabled: false,
      },
      {
        value: "3:30",
        display: "3:30-4:00",
        disabled: false,
      },
    ];
  
    res.render("appointment", {
      time,
      errors: req.flash("validationErrors"),
    });
  };