/*import { load, sync } from "all-package-names";

// Load from an existing sync (included on install)

load().then(({ packageNames }) => {
  console.log(packageNames.length); // array of all package names on npm
});*/
/*
var rp = require('request-promise');
async function main() {
collection = await rp("https://replicate.npmjs.com/_all_docs?limit=100");
parsedCollection = JSON.parse(collection);
var j = 0;
for(var i in parsedCollection.results) {
    console.log("Hi"+parsedCollection.results[i]);
}
}
main();*/

/*const scrape = require('website-scraper');
const options = {
  urls: ['http://nodejs.org/'],
  directory: '/saves/'
};
 
// with async/await
async function main() {
const result = await scrape(options);
}
main();*/
/*const check = require('check-npm-dependents');
check('lodash').then*/



//FUNKTIONIERT
/*const PackageDependents = require("package-dependents");

// Get is-there's dependents
PackageDependents("memfs").then(packages => {
    //console.log(packages.length);
    packages.forEach(c => {
        console.log(c.name + (c.author && c.author.name ? " by " + c.author.name : ""));
    })
})*/

/*const registry = require('all-the-packages')
 
registry
  .on('package', function (pkg) {
    console.log(`${pkg.name} - ${pkg.description}\n`)
  })
  .on('end', function () {
    // done
  })*/

/*  import { load, sync } from "all-package-names";

  // Load from an existing sync (included on install)
  
  load().then(({ packageNames }) => {
    console.log(packageNames.length); // array of all package names on npm
  });*/
const fs = require('fs');
  var fetch = require('isomorphic-unfetch');
  async function example2WithFetch(name) {
    const endpoint = `https://registry.npmjs.org/${name}`;
    const res = await fetch(endpoint);
    const data = await res.json();
    fs.writeFile('save/test.txt', JSON.stringify(data), err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
    })
  }
async function main(){
  for(i=0; i<1; i++){
    await example2WithFetch("hallowiegehtesso");
    console.log(i);
  }  
}
main();