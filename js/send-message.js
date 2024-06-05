const messageInput = document.querySelector("#message")
const alertMessage = document.querySelector("#alert")
const numberOfLetters = document.querySelector("#numberOfLetters")
const sendMessageForm = document.querySelector("#sendMessage")
const successMessage = document.querySelector("#successMessage")
const closeSuccessMessage = document.querySelector("#successMessage i")
const successMessageText = document.querySelector("#successMessage p")
const profileImage = document.querySelector("#profileImage")
const userNameHeader = document.querySelector("#userNameHeader")
const navLinks = document.querySelector("#navLinks")
const logo = document.querySelector("#logo")
messageInput.addEventListener("input", (e) => {
    numberOfLetters.innerHTML = `الحروف المتبقيه هى ${500 - e.target.value.length}`
})
const token = localStorage.getItem("token")
let id;
document.addEventListener("DOMContentLoaded", async (e) => {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('userName');
    const response = await fetch(`https://saraha-gilt.vercel.app/user/${userName}`,)
    const userData = await response.json()
    if (userData.message == "Done") {
        document.querySelector("#loadPage").classList.add("d-none")
        const { image, userName, _id } = userData.user
        if (image?.secure_url) {
            profileImage.setAttribute("src", image.secure_url)
        }
        userNameHeader.innerHTML = userName
        messageInput.setAttribute("placeholder", `كتب رساله ل ${userName} دون ان يعرفك`)
        id = _id
    }
    if (!token) {
        navLinks.innerHTML = `
            <li class="nav-item">
              <a
                class="nav-link fs-5 fw-medium mx-1"
                aria-current="page"
                href="signin.html"
                >تسجيل دخول</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link fs-5 fw-medium mx-1" href="signup.html"
                >تسجيل حساب</a
              >
            </li>
        `
        logo.setAttribute("href", "../index.html")
    } else {
        logo.setAttribute("href", "#")
    }

})
const sendMessage = async (e) => {
    e.preventDefault()
    if (messageInput.value.length < 4) {
        alertMessage.classList.add("d-block")
        alertMessage.classList.remove("d-none")
        alertMessage.innerHTML = 'يجب انت تكتب رساله لا تقل عن 4 حروف و لا تزيد عن 500 حرف'
        return;
    }
    const data = { text: messageInput.value }
    let response;
    if (token) {
        response = await fetch(`https://saraha-gilt.vercel.app/user/${id}/message/Authonticated/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
        })
    } else {
        response = await fetch(`https://saraha-gilt.vercel.app/user/${id}/message/sendMessage/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    const sendMessage = await response.json()
    console.log(sendMessage);
    if (sendMessage.message == "Done") {
        alertMessage.classList.add("d-none")
        alertMessage.classList.remove("d-block")
        await successMessageFunction("تم ارسال الرساله بنجاح")
        messageInput.value = ""
    } else if (sendMessage.message == "Validation error") {
        alertMessage.classList.add("d-block")
        alertMessage.classList.remove("d-none")
        alertMessage.innerHTML = "الرساله يجب ان تتكون من 4 احرف على الاقل"
    } else if (sendMessage.message == "In-valid receiver") {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = "هذا المستخدم غير متاح "
        return;
    } else if (sendMessage.message == "Your account is stopped") {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = "يجب تشغيل حسابك من خلال ذهابك الى صفحه حسابك و تفعيله من خلال زر تشغيل الحساب لتستطيع ان ترسل رسائل للاشخاص الاخرين"
    } else {
        let errors = '';
        for (const err of result.error) {
            errors += `${err.message}..........`
        }
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = `Server error ............ ${errors}`
        return;
    }
}
const successMessageFunction = async (content) => {
    successMessage.classList.add('d-block');
    successMessage.classList.remove('d-none');
    successMessageText.textContent = content
    setTimeout(function () {
        successMessage.classList.add('d-none');
        successMessage.classList.remove('d-block');
    }, 3000);
}
const disappearSuccessMessage = (e) => {
    successMessage.classList.add('d-none');
    successMessage.classList.remove('d-block');
}
sendMessageForm.addEventListener("submit", sendMessage)
closeSuccessMessage.addEventListener("click", disappearSuccessMessage)