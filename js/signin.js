const signinForm = document.querySelector("#signin")
const alertEmail = document.querySelector("#alertEmail")
const alertMessage = document.querySelector("#alert")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")

let emailTest = false
emailInput.addEventListener("input", () => {
    const emailRegex = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(emailInput.value)) {
        alertEmail.classList.add('d-block');
        alertEmail.classList.remove('d-none');
        alertEmail.innerHTML = "من فضلك ادخل بريد الكترونى صحيح"
        return
    } else {
        emailTest = true
        alertEmail.classList.add('d-none');
        alertEmail.classList.remove('d-block');
        return;
    }
})
let passwordTest = false
passwordInput.addEventListener("input", () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (!passwordRegex.test(passwordInput.value)) {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = "كلمة المرور يجب أن تحتوي على على الأقل 8 أحرف تتكون من حرف كبير وحرف صغير ورقم و نقبل اللغه الانجليزيه فقط لا غير"
        return
    } else {
        passwordTest = true
        alertMessage.classList.add('d-none');
        alertMessage.classList.remove('d-block');
        return;
    }
})
signinForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = emailInput.value
    const password = passwordInput.value

    if (!emailTest || !passwordTest) {
        return;
    }
    const user = {
        email,
        password,
    }
    const response = await fetch('https://saraha-gilt.vercel.app/auth/signin', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const result = await response.json()
    if (result.message == "Done") {
        localStorage.setItem("token", `HAMADA__${result.token}`)
        window.location.href = "./messages.html"
    } else if (result.message == "In-valid user") {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = `خطأ فى البريد الالكترونى تأكد من كتابته بشكل صحيح`
    } else if (result.message == "Confirm your email first") {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = `اذهب و تحقق من بريدك الالكترونى لتفعيل حسابك اولا `
    } else if (result.message == "Password miss match") {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = `خطأ فى كلمه المرور تأكد من كتابتها بشكل صحيح`
    } else {
        let errors = '';
        console.log(result);
        for (const err of result.error) {
            errors += `${err.message}..........`
        }
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = `Server error ............ ${errors}`
        return;
    }
})
