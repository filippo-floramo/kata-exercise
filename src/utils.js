const getScheduledDate = (birthday) => {

   const fullEmployeeDate = new Date(birthday);
   let month = fullEmployeeDate.getMonth() + 1;
   let dayOfMonth = fullEmployeeDate.getDate();

   const currentYear = new Date().getFullYear();
   const isLeapYear = isLeap(currentYear);

   if (isLeapYear && (month === 2 && dayOfMonth === 29)) {
      dayOfMonth = 1;
      month = 3;
      console.log("updated");
   }

   const scheduledDate = `0 9 ${dayOfMonth} ${month} *`

   console.log(scheduledDate);
   return scheduledDate
}

const isLeap = (year) => new Date(year, 1, 29).getDate() === 29;

module.exports = { getScheduledDate }