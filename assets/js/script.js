var artistEl = document.getElementById("artistName");
var songEl = document.getElementById("songName");
var albumEl = document.getElementById("albumName");
var searchButton = document.getElementById("search");
var coverEl = document.getElementById("cover");
var factsEl = document.getElementById("facts");
var lyricsEl = document.getElementById("lyrics");
var infoSongEl = document.getElementById("info-song");
var infoArtistEl = document.getElementById("info-artist");
var infoAlbumEl = document.getElementById("info-album");
var infoBioEl = document.getElementById("info-bio");
var infoGenreEl = document.getElementById("info-genre");
var infoOriginEl = document.getElementById("info-origin");
var infoDateEl = document.getElementById("info-date");

function searchHandler(event) {
    var artist = artistEl.value.trim();
	artist = artist.split(" ");
	artist = artist.join("%20");
    var song = songEl.value.trim();
	song = song.split(" ");
	song = song.join("%20");
    var apiUrl = "https://api.genius.com/search?access_token=zJR5ej6XMOAz17iEUDh32hGpZCmgwt7yNN3radinKSnI3i-Sx60laizqFjIEQkaN&q="+artist+"%20"+song;
    console.log(apiUrl);
	fetch(apiUrl)
    .then(response => response.json()).then(json => {
        var songId = json.response.hits[0].result.id;
        var songApiUrl = "https://api.genius.com/songs/"+songId+"?access_token=zJR5ej6XMOAz17iEUDh32hGpZCmgwt7yNN3radinKSnI3i-Sx60laizqFjIEQkaN";
        fetch(songApiUrl)
        .then(function(response) {
            response.json().then(function(data) {
                displayCover(data);
                displayLyricsLink(data);
                console.log(data);
            });
        });
    });
    getArtistFacts (artist);
}

function getArtistFacts (artist) {
    var apiUrl = "https://theaudiodb.com/api/v1/json/1/search.php?s=" + artist
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
			console.log(data);
			infoArtistEl.innerHTML = data.artists[0].strArtist;
			infoBioEl.innerHTML = data.artists[0].strBiographyEN;
			infoGenreEl.innerHTML = data.artists[0].strGenre;
			infoOriginEl.innerHTML = data.artists[0].strCountry;
		})
    });
}



function displayCover(data) {
    coverEl.src = data.response.song.header_image_url;
	infoSongEl.innerHTML = data.response.song.title;
	infoAlbumEl.innerHTML = data.response.song.album.name;
	infoDateEl.innerHTML = data.response.song.release_date_for_display;
}

function displayLyricsLink(data) {
	lyricsEl.innerHTML = data.response.song.embed_content;
}

// function displayFacts(data) {
//     var facts = data.response.song.description.dom.children
//     for (i=0; i<facts.length; i++) {
//         console.log(facts[i].children);
//     }
    
// }
// fetch("https://api.genius.com/search?access_token=zJR5ej6XMOAz17iEUDh32hGpZCmgwt7yNN3radinKSnI3i-Sx60laizqFjIEQkaN&q=Kendrick%20Lamar%20king%20kunta")
// .then(response => response.json()).then(json => {
//     console.log(json);
// });

// fetch("https://api.genius.com/songs/3039923?access_token=zJR5ej6XMOAz17iEUDh32hGpZCmgwt7yNN3radinKSnI3i-Sx60laizqFjIEQkaN")
// .then(function(response) {
//     response.json().then(function(data) {
//         console.log(data);
//     });
// });

var lyrics = document.querySelector("#lyrics")
// fetch("https://sridurgayadav-chart-lyrics-v1.p.rapidapi.com/apiv1.asmx/SearchLyricDirect?artist=michael%20jackson&song=thriller", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "sridurgayadav-chart-lyrics-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "74651c6c27msh2d27b3fd0293ce1p1513e2jsn17527c211e3f"
// 	}
// })
// fetch("https://api.chartLyrics.com/apiv1.asmx/SearchLyricDirect?artist=michael%20jackson&song",{
//     "method": "GET",
//     "HTTP": "1.1"
// })


// .then(function(response) {
//     response.text().then(function(data){
//         lyrics.innerHTML = data;
//     })
// })
// .catch(err => {
// 	console.error(err);
// });
// setTimeout(function() {
//     var lyric = document.getElementsByTagName("lyric");
//     console.log(lyric[0].innerHTML);
// }, 1000);

searchButton.addEventListener("click", searchHandler);