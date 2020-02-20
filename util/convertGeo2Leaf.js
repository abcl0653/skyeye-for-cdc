const fs = require('fs')

let geojsonData = {}
let jsonData=[]
fs.readFile('./310115.geojson.json', 'utf-8', (err, data) => {
    if (err) throw err
    geojsonData = JSON.parse(data)
    jsonData = geojsonData.features.map( feature => {
        // console.log(feature.properties.name)
        let block = {}
        block.ID = feature.properties.quhua
        block.Name = feature.properties.name
        block.Responsible = '负责人'
        block.Confirmed = Math.floor(Math.random() * 10)
        block.Uncomfirmed = Math.floor(Math.random() * 10)
        block.Contact = Math.floor(Math.random() * 30)
        block.Level = '2' // 镇：如张江镇，金桥镇
        block.LatLngs = feature.geometry.coordinates[0].map(LatLngs => {
            return [LatLngs[1], LatLngs[0]] // Reverse Lat & Lng
        })

        let statusArray = ['Good', 'Warning', 'Bad']
        block.Status = statusArray[Math.floor(Math.random() * statusArray.length)]

        return block
    } )
    // console.log(JSON.stringify(jsonData))
    fs.writeFile('block.json', JSON.stringify(jsonData), 'utf-8', err => {
        if (err) console.log(err)
    })
})