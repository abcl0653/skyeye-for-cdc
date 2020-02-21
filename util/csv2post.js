const parse = require('csv-parse/lib/sync')
const fs = require('fs')
const axios = require('axios')


fs.readFile('../db/csv/cdc-Grids.csv', 'utf-8', (err, data) => {
    if (err) throw err
    const grids = parse(data, {
        columns: true,
        skip_empty_lines: true
    })
    let testurl = 'http://localhost:4004/master/Grids'
    let url = 'https://i039497trial-dev-dcp-ui.cfapps.eu10.hana.ondemand.com/master/Grids'
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    // console.log(grids)
    grids.map(grid => {
        // grid.ID =+ 1
        grid.ID = parseInt(grid.ID)
        grid.parent_ID = parseInt(grid.parent_ID)
        grid.hierlevel = parseInt(grid.hierlevel)
        grid.houseHoldTotal = parseInt(grid.houseHoldTotal)
        // console.log(grid)
        axios.post(url, grid)
            .catch(response => console.log(response.response.data))
    })

})