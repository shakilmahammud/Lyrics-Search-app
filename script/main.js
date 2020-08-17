// Copyright 2020 All Receved by Author.
// Author: MD.SHAKIL

// declear 
const searchBtn= document.getElementById('searchBtn');
const search=document.getElementById('search');
const result=document.getElementById('result');
const apiUrl='https://api.lyrics.ovh';

// search button Event Listener
searchBtn.addEventListener('click',e=>{
    e.preventDefault();
    const searchValue=search.value;
    if(!searchValue){
        alert('There is nothing to search')
    }
    else{
        searchSong(searchValue)
        singleSearchValue(searchValue)
    }
})
// search Song album
async function searchSong(searchValue){
    const searchResult= await fetch(`${apiUrl}/suggest/${searchValue}`)
    const data=await searchResult.json();
        showData(data)
}
// show Search song
function showData(search){
    result.innerHTML =`
    ${search.data.map(song=>`
    <div class="d-flex justify-content-center">
    <div>
    <p class="author lead"><strong>${song.title}</strong> - Album by
    <span>
    ${song.artist.name}
    </span>
     <button class="btn btn-success"onclick="getArtistTitle('${song.artist.name}','${song.title}')" >Get Lyrics</button>
     </p> 
    </div>
    </div>
    
    `).join('')
}
` 
}
// single search button Event
async function singleSearchValue(searchValue){
    const searchResult= await fetch(`${apiUrl}/suggest/${searchValue}`)
    const data=await searchResult.json();
    getSingleSearch(data)
}

// get Single  Search 
function getSingleSearch(search){
    let singleResult= document.getElementById('singleResult');
    for(let i = 0; i<5;i++){
        let title = search.data[i].title;
        let artist = search.data[i].artist.name;
        let image = search.data[i].artist.picture_small; 
        singleResult.innerHTML+=`<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-8">
                <h3 class="lyrics-name" id="title">${title}</h3>
                <p class="author lead">Album by <span id="artistName">${artist}</span></p>
            </div>
            <div class="col-md-1">
                <img src="${image}" alt="">
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button  onclick="getArtistTitle('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`;
        
    }
    
}
// Artist Title search
function getArtistTitle(artist,title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(song => showLyrics(song,title));
}
// Lyrics  show
function showLyrics(song,title){
    if(song.lyrics == undefined){
        document.getElementById('displayLyrics').innerText = "there have no lyrics";
    }else{
        document.getElementById('displayLyrics').innerText = song.lyrics;
    }
    document.getElementById('songTitle').innerText = title;
}




//====================Done Assignment-6  Copy right receved by Author===============