const parse = require('csv-parse/lib/sync')
const fs = require('fs')

fs.readFile('310115.csv','utf-8',(err, data) => {
    if (err) throw err
    const orgUnits = parse(data, {
        columns: false,
        skip_empty_lines: true
    })
    orgUnits.shift()
    
    let nodes = orgUnits.map(line => {
        let node = {}
        node.ID = line[0]
        node.text = line[1]
        node.confirmed = 0 //Whatever number
        node.status = "Warning" //random value
        return node
    })

    let orgUnitsJSON = []
    
    orgUnitsJSON[0] = {
        "text": "上海市",
        "confirmed" : 12,
        "status": "Warning",
        "nodes":[{
            "ID": 310115,
            "text": "浦东新区",
            "confirmed": 12,
            "status": "Warning",
            "nodes":nodes
        },
        {
            "text": "黄浦区"
        }]
    }
    // console.log(orgUnits[0])
    // console.log(JSON.stringify(orgUnitsJSON))
    fs.writeFile('orgUnit.json', JSON.stringify(orgUnitsJSON),'utf-8', err => {
        if (err) console.log(err)
    })
})