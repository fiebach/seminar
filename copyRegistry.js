//ALL PACKAGES 2510451

import { load, sync } from "all-package-names";
import fs from 'fs';
import fetch from 'isomorphic-unfetch';
var success = 0;
var fail = 0;
var min = 100000;
var max = 100005;
var total = 0;

async function main(){
    const names = await load().then(({ packageNames }) => {return packageNames});
        for(var i = min; i < max; i++){
            total++;
            await getPackageInformation(names[i]);
            console.log("Total Number: "+total+"  Success: "+ success + "  Fail: "+ fail);
        }
}


async function getPackageInformation(name) {
    const endpoint = `https://registry.npmjs.org/${name}`;
    const res = await fetch(endpoint);
    const data = await res.json();
    if(JSON.stringify(data) !='{"error":"Not found"}'){
        await fs.writeFile('C:/registryData/'+name+'.txt', JSON.stringify(data), err => {
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