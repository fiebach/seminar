import fs from 'fs';
import fetch from 'isomorphic-unfetch';
import replaceall from "replaceall";
var success = 0;
var fail = 0;
var total = 0;

async function main(){
    const data2 = await fs.readFileSync("C:/Users/top1000/pagerank.txt", "utf8");
    var content = data2;
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
    for(var j=0; j < 500; j++){
        await getPackageInformation(contentArray[j]);
        console.log("Total Number: "+total+"  Success: "+ success + "  Fail: "+ fail + "  " + contentArray[j]);
    }
}

async function getPackageInformation(name) {
    const endpoint = `https://registry.npmjs.org/${name}`;
    const res = await fetch(endpoint);
    const data = await res.json();
    if(JSON.stringify(data) !='{"error":"Not found"}'){
        fs.writeFile('C:/registryData2/'+replaceall('"', '', replaceall("/", "--BACKSAPCE",JSON.stringify(name)))+'.txt', JSON.stringify(data), err => {
        if (err) {
            console.error(err)
            return
        }
        
        //file written successfully
        })
        success++;
    }else{
        fail++;
    }
}

main();