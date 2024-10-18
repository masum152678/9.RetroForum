const loadData = async(xyz)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${xyz}`)
    const data = await res.json()
    const posts = data.posts
    displayData(posts)
    // console.log(data)
}

const displayData = (posts)=>{
    // console.log(posts)
    const postContainer = document.getElementById('post-container')
    postContainer.innerText = '' //innerText == textContent
    posts.forEach(post=>{
        const myDiv = document.createElement('div')
        myDiv.classList = `card card-side bg-[#12132D0D] hover:bg-[#797DFC1A] hover:border-2 hover:border-[#797DFC66] shadow-lg p-5 mb-5`
        myDiv.innerHTML = `
                <figure>
                    <img
                    src="${post.image}"
                    alt="Movie" class="h-16 w-16 border rounded-xl" />
                </figure>
                <div class="card-body">
                    <p class="inter-font text-sm font-medium">#${post.category} <span class="ml-5"> Author: ${post.author.name}</span></p>
                    <p class="font-mulish text-lg font-bold">${post.description}</p>
                    <p class="inter-font text-base font-normal border-dashed border-b-2 border-b-slate-300 pb-3 mb-2">It’s one thing to subject yourself to ha Halloween costume mishap because, hey that’s your prerogative</p>
                    <div class="flex justify-between">
                              <div class="card-bottom-left flex">
                                <p class="flex items-center"><span class="mr-3"><img src="images/message.png" alt=""></span><span class="inter-font text-base font-medium text-[#12132D99]">560</span> </p>
                                <p class="flex items-center mx-8"><span class="mr-3"><img src="images/eye.png" alt=""></span><span class="inter-font text-base font-medium text-[#12132D99]">1568</span> </p>
                                <p class="flex items-center"><span class="mr-3"><img src="images/clock.png" alt=""></span><span class="inter-font text-base font-medium text-[#12132D99]">5 min</span> </p>
                              </div>
                              <div class="card-bottom-right">
                                 <img onclick="handleOnclick('${post.description}')" src="images/mail.png" alt="">
                              </div>
                    </div>
                    
                </div>
        `
        postContainer.appendChild(myDiv) 
   })

}



const loadLatestData = async()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
    const datas = await res.json()
    displayLatestPost(datas)
    // console.log(datas)
}
const displayLatestPost = (datas)=>{
    // console.log(datas[0])
    const latestPostContainer = document.getElementById('latest-post-container')
    
    datas.forEach(data=>{
       const postedDate = data.author.posted_date?data.author.posted_date:'No publish date'
       const myDIv2 = document.createElement('div')
       myDIv2.classList = `card bg-base-100 shadow-xl border border-[#12132D26]`
       myDIv2.innerHTML = `
                <figure>
                <img
                    src="${data.cover_image}"
                    alt="cover-photo" class="p-5 border-none rounded-lg" />
                </figure>
                <div class="card-body">
                <div class ="flex items-center">
                  <img src="images/date.png" alt="img" class="mr-3">
                  <p class="mulish-font text-base font-medium text-[#12132D99]">${postedDate}</p>
                </div>
                <p class="mulish-font text-base font-extrabold">${data.title}</p>
                <p class="mulish-font text-base font-normal text-[#12132D99]">${data.description}</p>
                  <div class="flex items-center mt-3">
                        <div class="photo">
                            <img src="${data.profile_image}" alt="" class="h-16 w-16 rounded-full mr-4 mt-1 p-3">
                        </div>
                        <div>
                            <h1 class="mulish-font text-base font-bold">${data.author.name}</h1>
                            <p class="mulish-font text-xs font-normal text-[#12132D99]">${data.author.designation}</p>
                        </div>
                   </div>
                </div>
       `
       latestPostContainer.appendChild(myDIv2)
    })


}
loadLatestData()


let count = 0;
const handleOnclick = (clickedTitle) => {
    // Increment the "mark as read" counter
    const markRead = document.getElementById('mark-read');
    count = count + 1;
    markRead.innerText = count;

    // Dynamically create a new sub-card with the clicked post's title
    const bodyRight = document.querySelector('.body-right .min-h-96'); // Parent div for the right-side cards
    
    // Create the new sub-card div
    const subCard = document.createElement('div');
    subCard.classList = 'flex justify-between items-center bg-white p-3 rounded-lg mulish-font mb-2'; // Apply classes to style the card
    
    // Create the inner HTML for the new card
    subCard.innerHTML = `
        <div class="main-card-2-left text-base font-medium w-2/3">
            <p>${clickedTitle}</p> <!-- Title comes from the clicked description -->
        </div>
        <div class="main-card-2-right flex w-1/3 pl-2">
            <img src="images/eye.png" alt="" class="h-5 w-5">
            <p class="pl-1">1568</p> <!-- Static data can be modified -->
        </div>
    `;

    // Append the new sub-card to the body-right section
    bodyRight.appendChild(subCard);
}

const handleSearch = ()=>{
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    console.log(searchText)
    loadData(searchText)
}
loadData('')