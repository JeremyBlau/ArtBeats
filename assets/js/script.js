let pictures;
let next = null
let nextBtn = document.querySelector('#next-btn')
let prevBtn = document.querySelector('#previous-btn')

//Local Storage Error Handling
if(localStorage.getItem('imageLastViewed')){
pictures = localStorage.getItem('imageLastViewed')
} else{
  pictures = 0
}


function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.harvardartmuseums.org/image?apikey=234ad53e-01dc-495c-8f0d-836ba0af5547';

    fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // Next and Previous button handling
            if(next){
              pictures++
            } else if(!next && pictures > 0){
              pictures--
              }
          // End of Next and Previous button handling
          console.log(pictures)
          console.log(data)
          //Get art image
          var baseImageUrl = data.records[pictures].baseimageurl;
          var imageElement = document.createElement('img');
          imageElement.src = baseImageUrl;
          var imageBox = document.querySelector('.image-box');
          imageBox.appendChild(imageElement);
          //Get art description
          var description = data.records[pictures].caption;
          var descriptionElement = document.createElement('p');
          descriptionElement.textContent = description;
          var descriptionBox = document.querySelector('.art-title-description-box');
          descriptionBox.appendChild(descriptionElement)
          // Stores last image viewed
          let lastImg = pictures
          localStorage.setItem('imageLastViewed', lastImg + 1)
        })
        .catch(function (error) {
          console.log('Error fetching data:', error);
          
        });
    }
getApi()
// Next and previous button handling
nextBtn.addEventListener('click', function(){
  next = true
  return next
})
nextBtn.addEventListener('click', getApi)
prevBtn.addEventListener('click', function(){
  next = false
  return next
})
prevBtn.addEventListener('click', getApi)
// End of next and previous button handling