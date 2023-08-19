import { auth, collection, db, getDocs, onAuthStateChanged } from "../config/Firebase.js";
const cardblogcont = document.getElementById('cardblogcont');


window.onload = function () {

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log(user);
        }

        else {
            window.location.href = '/screens/login.html'
        }
    });
    getBlogs()
};



const getBlogs = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
        const blogDoc = doc.data()
        console.log('ok', blogDoc);
        const cardDataContent = `
           <div class="mainDiv">
             <div class="cardblog">
               <div><img src=${blogDoc.userImage} alt="" class="userimg"></div>
               <div class="content">
                   <p>${blogDoc.title}</p>
                   <p>${blogDoc.userName}</p>
               </div>
             </div>


              <div>
               <p>${blogDoc.description}</p>
              </div>
             </div>
           `
        cardblogcont.innerHTML += cardDataContent
        return

    });

};

window.getBlogs = getBlogs



// active navbar
let nav = document.querySelector(".navigation-wrap");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("scroll-on");
    } else {
        nav.classList.remove("scroll-on");
    }
}

