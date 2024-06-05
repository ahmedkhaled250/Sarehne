const logout = document.querySelector("#logout")
console.log(logout);
if (logout) {
    logout.addEventListener("click", (e) => {
        localStorage.removeItem("token")
        window.location.href = "./signin.html"
    })
}
