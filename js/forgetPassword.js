const forgetPasswordForm = document.querySelector("#forgetPassword")
const alertEmail = document.querySelector("#alertEmail")
const alertPassword = document.querySelector("#alertPassword")
const alertCode = document.querySelector("#alertCode")
const alertMessage = document.querySelector("#alert")
const emailInput = document.querySelector("#email")
const codeInput = document.querySelector("#code")
const passwordInput = document.querySelector("#password")
const cPasswordInput = document.querySelector("#cPassword")
const requestCode = document.querySelector("#requestCode")
const successMessage = document.querySelector("#successMessage")
const closeSuccessMessage = document.querySelector("#successMessage i")
const successMessageText = document.querySelector("#successMessage p")
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
let user = {}
requestCode.addEventListener("click", async (e) => {
    e.preventDefault()
    if (!emailTest) {
        return;
    }
    user = {
        email: emailInput.value
    }
    const response = await fetch('https://saraha-gilt.vercel.app/user/sendCode', {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const result = await response.json()
    if (result.message == "Done") {
        console.log(result.message);
        await successMessageFunction(`تم ارسال الكود بنجاح تحقق منه فى بريدك الالكترونى`)
        console.log(result);
    } else if (result.message == "In-valid user") {
        alertEmail.classList.add('d-block');
        alertEmail.classList.remove('d-none');
        alertEmail.innerHTML = `خطأ فى البريد الالكترونى تأكد من كتابته بشكل صحيح`
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

})
let codeTest = false
codeInput.addEventListener("input", () => {
    const codeRegex = /^[1-9][0-9]{3}$/

    if (!codeRegex.test(parseInt(codeInput.value))) {
        alertCode.classList.add('d-block');
        alertCode.classList.remove('d-none');
        alertCode.innerHTML = "يجب ان تكتب رقم مكون من 4 ارقام فقط لا غير"
        return
    } else {
        codeTest = true
        alertCode.classList.add('d-none');
        alertCode.classList.remove('d-block');
        if (password.value === cPassword.value && alertMessage.textContent == "كلمات المرور غير متطابقة") {
            alertMessage.classList.add('d-none');
            alertMessage.classList.remove('d-block');
        }
        return;
    }
})
let passwordTest = false
passwordInput.addEventListener("input", () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (!passwordRegex.test(passwordInput.value)) {
        alertPassword.classList.add('d-block');
        alertPassword.classList.remove('d-none');
        alertPassword.innerHTML = "كلمة المرور يجب أن تحتوي على على الأقل 8 أحرف تتكون من حرف كبير وحرف صغير ورقم و نقبل اللغه الانجليزيه فقط لا غير"
        return
    } else {
        passwordTest = true
        alertPassword.classList.add('d-none');
        alertPassword.classList.remove('d-block');
        if (password.value === cPassword.value && alertMessage.textContent == "كلمات المرور غير متطابقة") {
            alertMessage.classList.add('d-none');
            alertMessage.classList.remove('d-block');
        }
        return;
    }
})
let cPasswordTest = false
cPasswordInput.addEventListener("input", () => {
    const cPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (!cPasswordRegex.test(cPasswordInput.value)) {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = "كلمة المرور يجب أن تحتوي على على الأقل 8 أحرف تتكون من حرف كبير وحرف صغير ورقم و نقبل اللغه الانجليزيه فقط لا غير"
        return;
    } else {
        cPasswordTest = true
        alertMessage.classList.add('d-none');
        alertMessage.classList.remove('d-block');
        if (passwordInput.value === cPasswordInput.value && alertMessage.textContent == "كلمات المرور غير متطابقة") {
            alertMessage.classList.add('d-none');
            alertMessage.classList.remove('d-block');
        }
        return;
    }
})
const successMessageFunction = async (content) => {
    successMessage.classList.add('d-block');
    successMessage.classList.remove('d-none');
    successMessageText.textContent = content
    setTimeout(function () {
        successMessage.classList.add('d-none');
        successMessage.classList.remove('d-block');
    }, 3000);
}
forgetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = emailInput.value
    const password = passwordInput.value
    const cPassword = cPasswordInput.value
    const code = parseInt(codeInput.value)

    if (!emailTest || !codeTest || !passwordTest || !cPasswordTest) {
        return;
    }
    if (password !== cPassword) {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = "كلمات المرور غير متطابقة"
        return;
    } else {
        alertMessage.classList.add('d-none');
        alertMessage.classList.remove('d-block');
    }
    const data = {
        email,
        code,
        password,
        cPassword,
    }
    const response = await fetch('https://saraha-gilt.vercel.app/user/forgetPassword', {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const result = await response.json()
    if (result.message == "Done") {
        localStorage.setItem("token", `HAMADA__${result.token}`)
    } else if (result.message == "In-valid user") {
        alertEmail.classList.add('d-block');
        alertEmail.classList.remove('d-none');
        alertEmail.innerHTML = `خطأ فى البريد الالكترونى تأكد من كتابته بشكل صحيح`
    } else if (result.message == "Confirm your email first") {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = `اذهب و تحقق من بريدك الالكترونى لتفعيل حسابك اولا `
    } else if (result.message == "This code is wrong") {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = `تأكد من كتابه الكود بشكل صحيح`
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
const disappearSuccessMessage = (e) => {
    successMessage.classList.add('d-none');
    successMessage.classList.remove('d-block');
}
closeSuccessMessage.addEventListener("click", disappearSuccessMessage)