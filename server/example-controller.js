//if user were to go to /, would print hello world
app.get('/', (req,res) => {
    res.send('Hello world');
});
