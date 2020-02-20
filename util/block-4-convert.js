const fs = require('fs')

let geojsonData = {}
let jsonData=[]
fs.readFile('./block-4.geojson.json', 'utf-8', (err, data) => {
    if (err) throw err
    geojsonData = JSON.parse(data)
    jsonData = geojsonData.features.map( feature => {
        // console.log(feature.properties.name)
        let block = {}
        block.ID = feature.properties.ID
        block.Name = feature.properties.Name
        block.Responsible = block.Name + '负责人'
        block.Confirmed = Math.floor(Math.random() * 4)
        block.Uncomfirmed = Math.floor(Math.random() * 6)
        block.Contact = Math.floor(Math.random() * 10)
        block.Level = '4' // 镇：如张江镇，金桥镇
        block.LatLngs = feature.geometry.coordinates[0].map(LatLngs => {
            return [LatLngs[1], LatLngs[0]] // Reverse Lat & Lng
        })

        let statusArray = ['Good', 'Warning', 'Bad']
        block.Status = statusArray[Math.floor(Math.random() * statusArray.length)]

        return block
    } )
    // console.log(JSON.stringify(jsonData))
    fs.writeFile('block-4.json', JSON.stringify(jsonData), 'utf-8', err => {
        if (err) console.log(err)
    })
})