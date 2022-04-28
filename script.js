const CLIENT_ID = `ce5ec2fda0f867cccecd`;
const CLIENT_SECRET = `fdc1dfe37f8513db2589456dfca1d69a7968937c`;

async function getUser(userName) {
  const user = await fetch(
    `https://api.github.com/users/${userName}?client-id=${CLIENT_ID}&client-secret=${CLIENT_SECRET}`
  );
  const profile = await user.json();
  return profile;
}
async function getRepos(profile) {
  const client = await fetch(
    `${profile.repos_url}?client-id=${CLIENT_ID}&client-secret=${CLIENT_SECRET}&per_page=10`
  );
  const repo = await client.json();
  return repo;
}

document.querySelector("#search-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = document.querySelector("#search").value;

  if (userInput.length > 0) {
    
    
    const profile = await getUser(userInput);
   
    if (profile.message === "Not Found") {
      document.querySelector(".notFound").style.display = "block";
    } else {
      const repos = await getRepos(profile);
      document.querySelector(".notFound").style.display = "none";
      document.querySelector('.user-profile').style.display ='flex';
      showUser(profile);
      showRepo(repos);
    }
  }
});
function showRepo(repos) {
  let newHtml = "";
  for (let repo of repos) {
    newHtml += `
        
        <div class="repo">
            <a class="repo-head" href="${repo.html_url}">${repo.name}</a>
                  <div class="repodetail">
                     <p><i class="fa-solid fa-message-code"></i><span class="cicle">${repo.language}</span> <i class="fa-solid fa-star"></i><span class="star"> ${repo.watchers}</span>
                      <i class="fa-solid fa-code-branch"></i>
                     <span class="branch">${repo.forks}</span></p>
                     </div>
                    </div>`;
  }
  document.querySelector(".repos").innerHTML = newHtml;
}

function showUser(user) {
  document.querySelector(".profile").innerHTML = `
    <img  class="user-pic"src="${user.avatar_url} " />" 
                  
     <p><span class="name">${user.name}</span></p>
     <p><span class="login">${user.login}</span></p>
     <p><span class="bio">${user.bio}</span></p>
     <div class="follower">
     <p><i class="fa-solid fa-users"></i> <span class="followers">${user.followers}</span></p> </span>followers - <i class="fa-solid fa-people-roof"></i><span class="following">${user.following} </span>following</p>

    </div>
    <div class="user-company">
    <p><i class="fa-solid fa-building"></i> <span class="company">${user.company}</span></p>

    </div>
        <div class="location">                 <p><i class="fa-solid fa-location-arrow"></i><span class="location"> ${user.location}</span></p>
                      </div>
            
    
    
    `;
}
