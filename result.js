import fs from "fs";
import replaceall from "replaceall";
const fileNames = fs.readdirSync('C:/registryData2/');
var content = JSON.parse(fs.readFileSync('pagerank-data.json'));
var list = new Array(content.length);
for(var i=0; i <content.length; i++){
    list[i] = content[i][0];
}
var uniqueList = [...new Set(list)];
console.log(fileNames.length);
for(var j=0; j < fileNames.length; j++){
    var o = false;
    for(var k=0; k < uniqueList.length; k++){
        if(replaceall("--BACKSAPCE", "/", fileNames[j].slice(0, fileNames[j].length-4)) === uniqueList[k]){
            o = true;
        }
    }
    if(!o){
        console.log(replaceall("--BACKSAPCE", "/", fileNames[j].slice(0, fileNames[j].length-4)));
    }
}
console.log(uniqueList.length);