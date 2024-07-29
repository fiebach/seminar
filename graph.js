import fs from "fs";
var numberOfPackages = 500;

var dependenciesFile = JSON.parse(fs.readFileSync('dependencies-data.json'));
var pagerankFile = JSON.parse(fs.readFileSync('pagerank-data.json'))

//oldestDate(dependenciesFile);
//oldestDate(pagerankFile);
//graph(dependenciesFile);
graph(pagerankFile);

function graph(contentArray){
    var number = new Array(133).fill(0);
    var dep = new Array(133).fill(0);
    var dev_dep = new Array(133).fill(0);
    var maintainer = new Array(133).fill(0);
    var actualPosition = 0;
    for(var j=0; j < numberOfPackages; j++){//500 Pakete
        console.log(j);
        var packageName = contentArray[actualPosition][0];
        var startyear = 2010;
        var startmonth = 11;
        
        for(var k=0; k < 133; k++){//Monate
            var o = actualPosition;
            var best = -1;
            while(true){
                if((contentArray[o][0] === packageName)){
                    var year = parseFloat(contentArray[o][2].slice(0,4));
                    var month = parseFloat(contentArray[o][2].slice(5,7));
                    //console.log(year + "  "+ month+ "   |   "+ startyear + "   "+ startmonth);
                    if((year < startyear) || (month <= startmonth && year == startyear)){
                        best = o;
                        o++;
                        if(o == contentArray.length){
                            break;
                        }
                    }else{
                        break;
                    }
                    
                }else{
                    break;
                }                
            }
            if(best != -1){
                //console.log("Year: "+startyear+"   Month: "+ startmonth+"    |    "+contentArray[best][2]);  
                number[k] = number[k] +1;
                dep[k] += contentArray[best][3];
                dev_dep[k] += contentArray[best][4];
                maintainer[k] += contentArray[best][5];
            }
            if(startmonth < 12){
                startmonth++;
            }else{
                startyear++;
                startmonth = 1;
            }
            
        }
        while(true){
            if((contentArray[actualPosition][0] === packageName) && (actualPosition != (contentArray.length-1))){
                actualPosition++;
            }else{
                break;
            }
        }
    }
    for(var t=0; t< number.length; t++){
        dep[t] = dep[t] / number[t];
        dev_dep[t] = dev_dep[t] / number[t];
        maintainer[t] = maintainer[t] / number[t];
    }
    fs.writeFileSync('data2/number.json', JSON.stringify(number));
    fs.writeFileSync('data2/dep.json', JSON.stringify(dep));
    fs.writeFileSync('data2/dev_dep.json', JSON.stringify(dev_dep));
    fs.writeFileSync('data2/maintainer.json', JSON.stringify(maintainer));  
}


//Gibt ältestes Datum zurück
function oldestDate(contentArray){
    var oldestYear = 2021;
    var oldestMonth = 12;
    for(var i=0; i<contentArray.length; i++){
        var versionTime = contentArray[i][2];
        var year = parseFloat(versionTime.slice(0,4));
        var month = parseFloat(versionTime.slice(5,7));
        if(year < oldestYear){
            oldestYear = year;
            oldestMonth = month;
        }
        if(year == oldestYear && month < oldestMonth){
            oldestMonth = month;
        }
    } 
    console.log("Oldest Date: "+oldestYear + " , "+ oldestMonth);   
}

