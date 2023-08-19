import { auth, db, doc, getDoc, getDownloadURL, onAuthStateChanged, ref, signOut, storage, updateDoc, uploadBytes } from "../config/Firebase.js";
const myCard = document.getElementById('myCard');


window.addEventListener("load", (event) => {

    onAuthStateChanged(auth, async (user) => {

        if (!user) {
            window.location.replace('/screens/login.html')
            return false;
        }
        const uid = user.uid
        console.log(uid);
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        const userDate = docSnap.data();
        console.log("Document data:", userDate);
        const userFName = userDate.userFName;
        const userLName = userDate.userLName;
        const userProfileData = `

        <label> 
         <img src=${userDate.userImage} class="card-img-top" alt="...">
         <input type="file" name="userImage" id="userImage" placeholder="chose your image">
        </label>
        <div class="card-body">
            <h5 class="card-title">${userFName} ${userLName} </h5>
            <div class="input my-4">
                <input type="password" class="form-control" placeholder="Old password">
            </div>

            <div class="input my-4">
                <input type="password" class="form-control" placeholder="Old password">
            </div>

            <div class="input my-4">
                <input type="password" class="form-control" placeholder="Old password">
            </div>
            <a href="#" class="btn btn-color" onclick="setUserImageToFirebase()">Update Profile</a>
        </div>
        `
        myCard.innerHTML += userProfileData


    });
});


async function setUserImageToFirebase() {
    const userImage = document.getElementById('userImage').files[0];
    console.log(userImage);

    let ImageUserSet;
    try {
        const storeageRef = ref(storage, 'userImages/' + userImage.name);
        const upload = await uploadBytes(storeageRef, userImage);
        console.log("file uploaded");
        const imageUrl = await getDownloadURL(storeageRef);
        ImageUserSet = imageUrl;
        const uid = auth.currentUser.uid
        const imageRef = doc(db, "users", uid);
        await updateDoc(imageRef, {
            userImage: ImageUserSet
        })
    } catch (err) {
        console.log(err.msg);
    }

    console.log(ImageUserSet);
    return ImageUserSet;

}


window.setUserImageToFirebase = setUserImageToFirebase

// async function getUserData(uid) {
//     try {
//         const docRef = doc(db, "users", uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//             console.log('data hai ?', docSnap.data());
//         } else {
//             console.log("No such document!");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }



// logOut Acount

const logOutAcount = () => {
    signOut(auth).then(() => {
        swal("signOut", 'seccessfully signOut', "success");
        setTimeout(() => {
            window.location.replace('/screens/acounts.html')
        }, 2000);

    }).catch((error) => {
        const errorMessage = error.message
        swal("Oops", errorMessage, "error")

    });
}
window.logOutAcount = logOutAcount