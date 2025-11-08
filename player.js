// player.js
// Music Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progress = document.getElementById('progress');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeProgress = document.getElementById('volumeProgress');
    const volumeBar = document.querySelector('.volume-bar');
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const albumImage = document.getElementById('albumImage');
    const playlistEl = document.getElementById('playlist');
    const musicPlayer = document.querySelector('.music-player');

    let currentSongIndex = 0;
    let isPlaying = false;

    // Initialize the player
    function initPlayer() {
        // Load the first song
        loadSong(currentSongIndex);
        
        // Create playlist
        renderPlaylist();
        
        // Set initial volume
        audioPlayer.volume = 0.7;
        updateVolumeProgress();
    }

    // Load a song
    function loadSong(index) {
        const song = songs[index];
        audioPlayer.src = song.src;
        trackTitle.textContent = song.title;
        trackArtist.textContent = song.artist;
        albumImage.src = song.cover;
        
        // Update active song in playlist
        updateActiveSong();
    }

    // Play or pause the song
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    // Play the song
    function playSong() {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicPlayer.classList.add('playing');
        audioPlayer.play();
    }

    // Pause the song
    function pauseSong() {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        musicPlayer.classList.remove('playing');
        audioPlayer.pause();
    }

    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update time displays
        currentTimeEl.textContent = formatTime(currentTime);
        
        if (!isNaN(duration)) {
            durationEl.textContent = formatTime(duration);
        }
    }

    // Set progress
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Update volume
    function setVolume(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const volume = clickX / width;
        
        audioPlayer.volume = volume;
        updateVolumeProgress();
    }

    // Update volume progress display
    function updateVolumeProgress() {
        const volume = audioPlayer.volume;
        volumeProgress.style.width = `${volume * 100}%`;
    }

    // Format time in mm:ss
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // Render playlist
    function renderPlaylist() {
        playlistEl.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <i class="fas fa-music"></i>
                <div>
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
            `;
            li.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                if (isPlaying) {
                    playSong();
                }
            });
            playlistEl.appendChild(li);
        });
        updateActiveSong();
    }

    // Update active song in playlist
    function updateActiveSong() {
        const playlistItems = playlistEl.querySelectorAll('li');
        playlistItems.forEach((item, index) => {
            if (index === currentSongIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextSong);
    progressBar.addEventListener('click', setProgress);
    volumeBar.addEventListener('click', setVolume);

    // Initialize the player
    initPlayer();
});
