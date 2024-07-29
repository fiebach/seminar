import fs from "fs";
import replaceall from "replaceall";

var bigArray = new Array(3000000);
var arrayIndex = 0;
var i = 0;
var k = 0;
var j = 0;
const fileNames = fs.readdirSync('C:/registryData2/');
fileNames.forEach(file => {
    k++;
    var fileContent = fs.readFileSync('C:/registryData2/'+file);
    if(fileContent.indexOf('time":{')){
        i++;

        var beginInformation = fileContent.indexOf('versions":{')+11;
        var beginTimeContent = fileContent.indexOf('time":{')+7;
        var endTimeContent = fileContent.indexOf('}', beginTimeContent)+1;
        var beginVersion = 1
        var beginTime;
        var endTime;
        var endVersion;
        //fileContent.slice(beginTime, endTime);
        var timeContent = fileContent.slice(beginTimeContent, endTimeContent).toString();
        while(true){
            endVersion = timeContent.indexOf('":"', beginVersion);
            beginTime = endVersion+3;
            endTime = timeContent.indexOf('","', beginTime);
            if(endTime == -1){
                endTime = timeContent.indexOf('"}', beginTime);
            }
            if(endVersion != -1){

                if(timeContent.substring(beginVersion, endVersion) != 'created' && timeContent.substring(beginVersion, endVersion) != 'modified'){
                    
                    //console.log("Number of Files: " + k + "    | Number of Versions: " + j);
                    var nameOfPackage = file.substring(0, file.length-4);
                    //console.log(timeContent.substring(beginVersion, endVersion)+" , "+ timeContent.substring(beginTime, endTime)+ " , "+ beginVersion + " , " +endVersion+ " , "+beginTime+" , "+endTime);
                    findInformation(timeContent.substring(beginVersion, endVersion), timeContent.substring(beginTime, endTime), fileContent.toString(), replaceall("--BACKSAPCE", "/", nameOfPackage));
                }
                
                beginVersion = endTime+3;
            }else{
                break;
            }
        }
        var begin = 0;
    }else{
        //console.log("Fail");
    }

})
console.log(arrayIndex);
var data = JSON.stringify(bigArray.slice(0, arrayIndex));
fs.writeFileSync('maintainerNamesDep-data2.json', data);



function findInformation(name, time, content, packageName){
    var openClips = 1;
    var a = content.indexOf('versions":{')+11;
    var versionInformation = content.indexOf('"version":"'+name+'"', a);
    if(versionInformation != -1){
        j++;
        console.log("Number of Files: " + k + "    | Number of Versions: " + j + "        | Version Name: " + name);
        var actualSearchPosition = versionInformation;
        //console.log(content.slice(versionInformation, versionInformation+200));
        var numberOfDep=0;
        var numberOfDevDep=0;
        var numberOfMain=0;
        
        while(true){
            var textfound = false;
            if(openClips == 0){
                break;
            }
            if(content.indexOf('"', actualSearchPosition) < content.indexOf('{', actualSearchPosition) && content.indexOf('"', actualSearchPosition) < content.indexOf('}', actualSearchPosition) && content.indexOf('"', actualSearchPosition) != -1){
                textfound = true;
            }
            if(textfound){
                //console.log(actualSearchPosition);
                actualSearchPosition = content.indexOf('"', actualSearchPosition)+1;
                while(true){
                    var secound = content.indexOf('"', actualSearchPosition);
                    var secoundSearch = secound-1;
                    var counter=0;
                    while(content[secoundSearch] == '\\'){
                        counter++;
                        secoundSearch--;
                    }
                    actualSearchPosition = secound+1;
                    if((counter % 2) == 0){
                        break;
                    }
                }
                
                
            }else{
                if(content.indexOf('{', actualSearchPosition) < content.indexOf('}', actualSearchPosition)){
                    actualSearchPosition = content.indexOf('{', actualSearchPosition)+1;
                    //if(content.indexOf('{', actualSearchPosition) == -1){ console.log("ARN")};
                    openClips++;
                }else{
                    actualSearchPosition = content.indexOf('}', actualSearchPosition)+1;
                    //if(content.indexOf('}', actualSearchPosition) == -1){ console.log("ARN")};
                    openClips--;
                }                
            }

        }
        var importantContent = content.substring(versionInformation, actualSearchPosition);
        if(importantContent.indexOf('"dependencies":{"') != -1){
            var beginDep = importantContent.substring(importantContent.indexOf('"dependencies":{"')+17, importantContent.indexOf('"}', importantContent.indexOf('"dependencies":{"')+17));
            var indexDep = 0;
            while(true){
                if(beginDep.indexOf('":"', indexDep) != -1){
                    numberOfDep++;
                    indexDep = beginDep.indexOf('":"', indexDep)+3;
                }else{
                    break;
                }
            }
            //console.log("Number of Dependencies: " + numberOfDep);
        }
        if(importantContent.indexOf('"devDependencies":{"') != -1){
            var beginDevDep = importantContent.substring(importantContent.indexOf('"devDependencies":{"')+20, importantContent.indexOf('"}', importantContent.indexOf('"devDependencies":{"')+20));
            var indexDevDep = 0;
            while(true){
                if(beginDevDep.indexOf('":"', indexDevDep) != -1){
                    numberOfDevDep++;
                    indexDevDep = beginDevDep.indexOf('":"', indexDevDep)+3;
                }else{
                    break;
                }
            }
            //console.log("Number of DevDependencies: " + numberOfDevDep);
        }
        var mainName = new Array();
        if(importantContent.indexOf('"maintainers":[') != -1){
            var beginMain = importantContent.substring(importantContent.indexOf('"maintainers":['), importantContent.indexOf(']', importantContent.indexOf('"maintainers":[')));
            //console.log(beginMain);
            var indexMain = 0;
            while(true){
                if(beginMain.indexOf('{', indexMain) != -1){
                    //console.log("Index: " + beginMain.indexOf('{', indexMain));
                    mainName.push(beginMain.substring(beginMain.indexOf('"email":"',beginMain.indexOf('{', indexMain))+9, beginMain.indexOf('"',beginMain.indexOf('"email":"',beginMain.indexOf('{', indexMain))+9)));
                    numberOfMain++;
                    indexMain = beginMain.indexOf('{', indexMain)+1;
                }else{
                    break;
                }
            }
            //console.log("Number of Maintainers: " + numberOfMain);
        }else{
            console.log("WARNING: No Maintainers are found for "+packageName + " , " + name);
        }        
    
    
        var newArray = new Array(7);
        newArray[0] = packageName;
        newArray[1] = name;
        newArray[2] = time;
        newArray[3] = numberOfDep;
        newArray[4] = numberOfDevDep;
        newArray[5] = numberOfMain;
        newArray[6] = mainName;
        if(arrayIndex>0){
            if(bigArray[arrayIndex-1][0] === packageName){
                arrayIndex--;
            }            
        }

        bigArray[arrayIndex]= newArray;
        //console.log(newArray);
        arrayIndex++;
    }
}