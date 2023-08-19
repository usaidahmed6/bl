import { addDoc, auth, blogRef, collection, db, deleteDoc, doc, getDoc, getDocs, onAuthStateChanged } from "../config/Firebase.js"


const cardblogcont = document.getElementById('cardblogcont');


window.onload = function () {
    getBlogs()


}

const getBlogs = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
        const uid = auth.currentUser.uid;
        console.log('uid====>', uid);
        const blogDoc = doc.data()
        const id = doc.id

        if (blogDoc.uid === uid) {
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
               <a class="delete" onclick="deleteorder('${id}')">
               delete
               </a>
             </div>
           `
            cardblogcont.innerHTML += cardDataContent
            return
        }
    });

};

window.getBlogs = getBlogs

const deleteorder = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
    console.log('delete working');
}
window.deleteorder = deleteorder



const addBlog = async () => {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value;
    const uid = auth.currentUser.uid;
    console.log(uid);
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (!title || !description) {
        swal("Oops !", "please fill out this fields ", "error");
        return
    }
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const dataUser = docSnap.data()
        const obj = {
            userName: dataUser.userFName,
            userImage: dataUser.userImage,
            uid,
            title,
            description
        }
        await addDoc(blogRef, obj)

    } else {
        console.log("No such document!");
    }
}

window.addBlog = addBlog