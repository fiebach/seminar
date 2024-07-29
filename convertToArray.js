import fs from 'fs';

const data = fs.readFileSync("C:/Users/Desktop/top1000/pagerank.txt", "utf8");
var content = data;
console.log(content);
var newElementFound = true;
var actualPosition = 0;
var i = 0;
var contentArray = new Array(1000);
while(newElementFound){
    var begin = content.indexOf('. [', actualPosition)+3;
    if(begin != -1 && i < 1000){
        
        var end = content.indexOf(']', begin);
        var actualPosition = end;
        var packageName = content.substring(begin, end);
        contentArray[i] = packageName;
        i++;
        

    }else{
        newElementFound=false;
    }
}
fs.writeFile('arrayList/pagerank.txt', contentArray.toString(), function (err) {
    if (err) throw err;
    console.log('Saved!');
}); 