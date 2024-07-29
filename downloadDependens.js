import fs from 'fs';
import fetch from 'isomorphic-unfetch';
import replaceall from "replaceall";
var success = 0;
var fail = 0;

async function main(){
    const data2 = await fs.readFileSync("C:/Users/Desktop/top1000/mostdepended.txt", "utf8");
    var content = data2;
    console.log(content);
    var newElementFound = true;
    var actualPosition = 0;
    var i = 0;
    var graphData = new Array(80).fill(0);
    var graphData2 = new Array(80).fill(0);
    var contentArray = new Array(1000);
    var oldArray = new Array(1000);
    var averageArray = new Array(500);
    while(newElementFound){
        var begin = content.indexOf('. [', actualPosition)+3;
        if(begin != -1 && i < 1000){
            
            var end = content.indexOf(']', begin);
            var beginNumber = content.indexOf(') - ', end)+4;
            var endNumber = content.indexOf('\n', beginNumber);
            var actualPosition = end;
            var packageName = content.substring(begin, end);
            var packageDependents2 = content.substring(beginNumber, endNumber);
            oldArray[i] = parseInt(packageDependents2); 
            contentArray[i] = packageName;
            i++;
            

        }else{
            newElementFound=false;
        }
    }
    averageArray = await JSON.parse(fs.readFileSync('dependensDevelopment2.json', "utf8"));
    /*for(var j=0; j < 500; j++){
        if(averageArray[j] === null){
            //await getPackageInformation();
            
            newArray[j] = await check(contentArray[j]);//.then(console.log);
            var b = new Array(2);
            b[0] = contentArray[j];
            b[1] = (newArray[j] / oldArray[j])*100-100; 
            b[2] = oldArray[j];
            b[3] = newArray[j];
            console.log(j , contentArray[j], oldArray[j], newArray[j]);
            averageArray[j] = b;
            await fs.writeFileSync("dependensDevelopment2.json", JSON.stringify(averageArray));            
        }

    }*/
    await averageArray.sort(function (element_a, element_b) {
        return element_a[1] - element_b[1];
    });
    console.log("Weakest Developement");
    await fs.writeFileSync("dependensDevelopment.json", JSON.stringify(averageArray));
    for(var p=0; p < 10; p++){
        console.log(averageArray[p][0] + " | " + averageArray[p][2] +" | " + averageArray[p][3]+" | " + Math.round(averageArray[p][1]) + "\%");
    }
    console.log("Strongest Development");
    for(var l=490; l<500; l++){
        console.log(averageArray[l][0] + " | " + averageArray[l][2] +" | " + averageArray[l][3]+" | " + Math.round(averageArray[l][1]) + "\%");
    }
    var oldValue = 0;
    var newValue = 0;
    for(var x=0; x <500; x++){
        oldValue += averageArray[x][2];
        newValue += averageArray[x][3];
    }
    console.log("Average Development")
    console.log(oldValue, newValue, Math.round((newValue/oldValue)*100-100));

    for(var n=0; n< 500; n++){
        graphData[Math.round(averageArray[n][1]/10)] +=1;
        if(Math.round(averageArray[n][1]/10) > 790){
            console.log("oh fuck");
        }
        
    }
    for(var m=0; m <80; m++){
        graphData2[m] = m*10; 
    }
    var bla = 0;
    for(var b=0; b <80; b++){
        bla += graphData[b];
        if(bla >= 250){
            console.log(b*10);
            break;
        }
    }
    console.log(replaceall(",", ";",graphData.toString()));
    console.log(replaceall(",", ";",graphData2.toString()));
}

async function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
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