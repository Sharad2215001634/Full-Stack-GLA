

let playBtn = document.querySelector('#play-btn')
let progress = document.querySelector('#progress')
let songList = document.querySelector('#song-list')
let backwardBtn = document.querySelector('#backward-btn');
let forwardBtn = document.querySelector('#forward-btn');
let timestamp = document.querySelector('#timestamp');
let songNameDisplay = document.querySelector('#song-name');

let songs  = [
    {
        name:"song1",
        id:1
    },
    {
        name:"song2",
        id:2
    },
    {
        name:"song3",
        id:3
    },
    {
        name:"song4",
        id:4
    },
    {
        name:"song5",
        id:5
    }
    ,
    {
        name:"song6",
        id:2
    }
    ,
    {
        name:"song7",
        id:3
    }
    ,
    {
        name:"song8",
        id:4
    }
]


let currentSongIndex = 0;
const audio = new Audio(`./Media/song${songs[currentSongIndex].id}.mp3`);
// show all the songs ul
for (let song of songs) {
    let li = document.createElement('li');
    li.innerText = song.name;
    li.setAttribute('id', song.id);
    li.classList.add('song-item');
    songList.append(li);
}

// const audio = new Audio('./Media/song1.mp3');

// play - pause btn

playBtn.addEventListener('click', function() {
    audio.paused ? audio.play() : audio.pause();
    if (playBtn.children[0].classList.contains('fa-play')) {
        playBtn.children[0].classList.remove('fa-play');
        playBtn.children[0].classList.add('fa-pause');
    } else {
        playBtn.children[0].classList.add('fa-play');
        playBtn.children[0].classList.remove('fa-pause');
    }
});

// timeupdate
audio.addEventListener('timeupdate', function() {
    let currentProgress = (audio.currentTime * 100) / audio.duration;
    progress.value = currentProgress;
    updateTimestamp();
});
// event(change)
progress.addEventListener('change', function() {
    audio.currentTime = audio.duration * progress.value / 100;
    updateTimestamp();
});


// khud se select kro gaana
songList.addEventListener('click', function(e) {
    let songId = e.target.getAttribute('id');
    currentSongIndex = songs.findIndex(song => song.id == songId);
    audio.src = `./Media/song${songId}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playBtn.children[0].classList.remove('fa-play');
    playBtn.children[0].classList.add('fa-pause');
    songNameDisplay.innerText = songs[currentSongIndex].name; // Update song name
    updateTimestamp();
});



forwardBtn.addEventListener('click', function(e) {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audio.src = `./Media/song${songs[currentSongIndex].id}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playBtn.children[0].classList.remove('fa-play');
    playBtn.children[0].classList.add('fa-pause');
    songNameDisplay.innerText = songs[currentSongIndex].name; // Update song name
    updateTimestamp();
});

// Backward button functionality
backwardBtn.addEventListener('click', function(e) {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audio.src = `./Media/song${songs[currentSongIndex].id}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playBtn.children[0].classList.remove('fa-play');
    playBtn.children[0].classList.add('fa-pause');
    songNameDisplay.innerText = songs[currentSongIndex].name; // Update song name
    updateTimestamp();
});


// task right and left click (id + , id -)

// ---------------------------------------------------
// assignment-3 (2 days -> friday-12baje raat ke)
// style it 
// do next and forward  ✅
// ---------------------------------------------------


function updateTimestamp() {
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);

    if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;
    if (durationSeconds < 10) durationSeconds = '0' + durationSeconds;

    timestamp.innerText = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
}