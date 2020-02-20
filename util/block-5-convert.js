const fs = require('fs')

let geojsonData = {}
let jsonData=[]
fs.readFile('./block-5.geojson.json', 'utf-8', (err, data) => {
    if (err) throw err
    geojsonData = JSON.parse(data)
    jsonData = geojsonData.features.map( (feature, index) => {
        // console.log(feature.properties.name)
        let block = {}
        block.ID = 310115125001000 + index + 1 //feature.properties.ID
        block.Name = `汤臣二期${index+1}号楼`//feature.properties.Name
        block.Responsible = block.Name + '负责人'
        block.Confirmed = Math.floor(Math.random() * 2)
        block.Uncomfirmed = Math.floor(Math.random() * 3)
        block.Contact = Math.floor(Math.random() * 10)
        block.Level = '5' 
        block.LatLngs = feature.geometry.coordinates[0].map(LatLngs => {
            return [LatLngs[1], LatLngs[0]] // Reverse Lat & Lng
        })

        // let statusArray = ['Good', 'Warning', 'Bad']
        // block.Status = statusArray[Math.floor(Math.random() * statusArray.length)]
        block.Status = 'Good'

        return block
    } )
    // console.log(JSON.stringify(jsonData))
    fs.writeFile('block-5.json', JSON.stringify(jsonData), 'utf-8', err => {
        if (err) console.log(err)
    })
})