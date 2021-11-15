var fs = require('fs');
const XLSX = require('xlsx')

// var path = './Data/authors.csv'

// //sorting the json...
function compareStrings(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  return (a < b) ? -1 : (a > b) ? 1 : 0;
}


// //reding csv and converting it into json..........

const csv_to_json = async (path,callback)=>{
    await fs.readFile(path,(err,data)=>{
        let jsonData = [];
        var content = data.toString().split('\n').join().split('\r');
        var key = content[0].split(';');
        content.shift();

        content.forEach((item)=>{
            var temp = item.replace(",").split(';');
            var data = {}
            for(var i=0;i<key.length;i++){
                data[key[i]] = temp[i]
            }

            jsonData.push(data);
        })

        console.log(jsonData)

        jsonData.sort(function(a, b) {
            return compareStrings(a.title, b.title);
        })

          callback(err,jsonData)
              
    })
}


// //search through isbn
const search_isbn = async (path,isbn)=>{
    await csv_to_json(path,(err,data)=>{
        for(var i=0;i<data.length;i++){
            if(data[i].isbn === isbn){
                console.log(data[i])
                break;
            }
        }
    })
}



// //search through author

const search_author = async(path,author)=>{

    await csv_to_json(path,(err,data)=>{
        var result = [];

        data.forEach((item)=>{
            if(item.authors === author){
                result.push(item)
            }
        })

        console.log(result);
    })
}




// save json to xlsv by appending  new_data .............

// const newData = {
//     title: 'mandip singh',
//     isbn: '1317-4945-8875',
//     authors: 'ms-gustafsson@echocat.org',
//     publishedAt: '29.02.2012'
// }

const push_convert_xlsx = async (path,jsdata={},filename) => {

    csv_to_json(path,(err,data)=>{
        data.push(jsdata);

        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workBook, workSheet, "students")
        // Generate buffer
        XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

        // Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

        XLSX.writeFile(workBook, `./storage/${filename}.xlsx`)
    })

}

//exporting all functions 

module.exports = {
    csv_to_json,
    search_author,
    search_isbn,
    push_convert_xlsx
}