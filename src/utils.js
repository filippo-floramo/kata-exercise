const getScheduledDate = (birthday) => {

   const fullDate = new Date(birthday);

   const scheduledDate = `0 9 ${fullDate.getDate()} ${fullDate.getMonth() + 1} *`

   console.log(scheduledDate);
   return scheduledDate
}

module.exports = { getScheduledDate }