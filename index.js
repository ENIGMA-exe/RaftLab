const fs = require('fs');
const XLSX = require('xlsx')
const {csv_to_json,search_author,search_isbn,push_convert_xlsx} = require ('./functions.js')

                                        //code here.........

//note:- keep your csv file inside the data folder
var path = './Data/magazines.csv';




//get csv data in JSON format (sorted)

// csv_to_json(path,(err,data)=>{
//     console.log(data);
// })





//search book, magazines based on author
//search_author(path of your csv file,'author name')   example:-

// search_author('./Data/magazines.csv','null-mueller@echocat.org')




//search book, magazines based on isbn
//search_isbn(path,"isbn")      example:-

// search_isbn('./Data/magazines.csv','4545-8541-2012');




//add new data(json) to existing file and create new xlsv file
//note your output xlsx file will store inside 'STORAGE' Folder
// push_convert_xlsx('./Data/magazines.csv',newJSONdata,'yourfilename')