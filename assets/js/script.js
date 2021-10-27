

fetch("https://api.genius/search?q=Kendrick%20Lamar").then(function(response) {
    response.json().then(function(data) {
        console.log(data);
        var lyrics = data.message.body.lyrics.lyrics_body;
        console.log(lyrics);
    });
});

