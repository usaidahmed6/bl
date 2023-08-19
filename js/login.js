import { auth, signInWithEmailAndPassword } from "../config/Firebase.js";




const signin = () => {
    spinner.setAttribute("class", "spinner-dis-inline-block")
    const userEmail = document.getElementById('userEmail').value
    const userPassword = document.getElementById('userPassword').value
    if (!userEmail || !userPassword) {
        swal("Oops !", "please fill out this fields ", "error");
        return false
    }
    else {
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                spinner.setAttribute("class", "spinner-dis-inline-block")
                // Signed in 
                const user = userCredential.user;
                console.log('uid========>', user.uid);
                const uid = user.uid
                swal("Success Login ", "Welcome To Blogging App", "success");
                setTimeout(() => {
                    window.location.replace('/')
                }, 2000);
            })
            .catch((error) => {
                spinner.setAttribute("class", "spinner-dis-none");
                swal("Oops", error.message, "error");
            })

        spinner.setAttribute("class", "spinner-dis-none");
    }

}
window.signin = signin