const scapper = require('../scrapper')
const express = require('express')
const { env } = require('process')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'src/public/view/index.html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
  });

app.get('/Popular/:page', async (req, res) => {
    const result = await scapper.popular(req.params.page)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/NewSeasons/:page', async (req, res) => {
    const result = await scapper.newSeason(req.params.page)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/search/:query', async (req, res) => {

    const result = await scapper.search(req.params.query)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/getAnime/:query', async (req, res) => {

    const result = await scapper.anime(req.params.query)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/getEpisode/:query', async (req, res) => {
    
    const result = await scapper.watchAnime(req.params.query)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

port = env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
