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
var modalDlg = document.querySelector('#image-modal');
var imageModalCloseBtn = document.querySelector('.image-modal-close');
var recentSearchesEl = document.querySelector('#recentSearches');
var songArr = [];

function searchHandler(event) {
    var artist = artistEl.value.trim();
	if (!artist){
		modalDlg.classList.add('is-active');
	}
	artist = artist.split(" ");
	artist = artist.join("%20");
    var song = songEl.value.trim();
	song = song.split(" ");
	song = song.join("%20");
    var apiUrl = "https://api.genius.com/search?access_token=zJR5ej6XMOAz17iEUDh32hGpZCmgwt7yNN3radinKSnI3i-Sx60laizqFjIEQkaN&q="+artist+"%20"+song;
    console.log(apiUrl);
	fetch(apiUrl)
    .then(response => response.json()).then(json => {
		if (json.response.hits[0]) {
			var songId = json.response.hits[0].result.id;
			var songApiUrl = "https://api.genius.com/songs/"+songId+"?access_token=zJR5ej6XMOAz17iEUDh32hGpZCmgwt7yNN3radinKSnI3i-Sx60laizqFjIEQkaN";
			fetch(songApiUrl)
			.then(function(response) {
				console.log(response);
					response.json().then(function(data) {
						displayCover(data);
						displayLyricsLink(data);
						getArtistFacts (artist);
						loadSongs();
						saveSongs(artist, song);
				});
			});
		} else {
			modalDlg.classList.add('is-active');

		}
    });
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

function saveSongs(artist, song) {
	songArr = [];
	var sentence = artist.split("%20");
	var capSentence = [];
    for(i=0; i<sentence.length; i++) {
        var word = sentence[i];
        word = word.split('')
        word[0] = word[0].toUpperCase();
        word = word.join('');
        capSentence.push(word);
        }
    artist = capSentence.join(" ");
	var sentence = song.split("%20");
	var capSong = [];
    for(i=0; i<sentence.length; i++) {
        var word = sentence[i];
        word = word.split('')
        word[0] = word[0].toUpperCase();
        word = word.join('');
        capSong.push(word);
        };
    song = capSong.join(" ");
	songArr.push({
		artist: artist,
		song: song
	});
	localStorage.setItem("songs", JSON.stringify(songArr));
}

function loadSongs () {
	songArr = JSON.parse(localStorage.getItem("songs"));
	if(!songArr){
		songArr=[];
	};
	recentSearchesEl.innerHTML="Previous Search<br>" + songArr[0].song + " by " + songArr[0].artist;

}

imageModalCloseBtn.addEventListener('click', function(){
	modalDlg.classList.remove('is-active');
});
searchButton.addEventListener("click", searchHandler);
loadSongs();