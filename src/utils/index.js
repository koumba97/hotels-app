// get current date
let newDate = new Date();
let date = newDate.getDate();
if(date.toString().length===1){
    date = "0"+date;
}
let month = newDate.getMonth() + 1;
if(month.toString().length===1){
    month = "0"+month;
}
let year = newDate.getFullYear();
export const currentDate = year + '-' + month + '-' + date;


// adding 5 days to current date to get default return date
newDate.setDate(newDate.getDate() + 5)
let returnD = newDate.getDate();
if(returnD.toString().length===1){
    returnD = "0"+returnD;
}
let returnM = newDate.getMonth() + 1;
if(returnM.toString().length===1){
    returnM = "0"+returnM;
}
let returnY = newDate.getFullYear();
export const returnDate = returnY + '-' + returnM + '-' + returnD;
