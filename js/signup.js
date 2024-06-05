const signupForm = document.querySelector("#signup")
const alertUserName = document.querySelector("#alertUserName")
const alertLinkName = document.querySelector("#alertLinkName")
const alertEmail = document.querySelector("#alertEmail")
const alertPassword = document.querySelector("#alertPassword")
const alertCPassword = document.querySelector("#alertCPassword")
const alertGender = document.querySelector("#alertGender")
const alertMessage = document.querySelector("#alert")
const userNameInput = document.querySelector("#userName")
const linkNameInput = document.querySelector("#linkName")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")
const cPasswordInput = document.querySelector("#cPassword")
const genderInput = document.querySelector("#gender")

let userNameTest = false
userNameInput.addEventListener("input", () => {
    const nameRegex = /^[A-Za-zء-ي][A-Z 0-9a-zء-ي]{2,20}$/
    if (!nameRegex.test(userNameInput.value)) {
        alertUserName.classList.add('d-block');
        alertUserName.classList.remove('d-none');
        alertUserName.innerHTML = "الاسم يجب ان يبده بحرف و اقل عدد من الحروف هو 4 و اكبر عدد من الحروف هو 20 و تستطيع ان تكتب حروف او ارقام فقط "
        return;
    } else {
        userNameTest = true
        alertUserName.classList.add('d-none');
        alertUserName.classList.remove('d-block');
        return;
    }
})
let linkNameTest = false
linkNameInput.addEventListener("input", () => {
    const linkNameRegex = /^[A-Za-zء-ي][A-Z0-9a-zء-ي]{2,20}$/
    if (!linkNameRegex.test(linkNameInput.value)) {
        alertLinkName.classList.add('d-block');
        alertLinkName.classList.remove('d-none');
        alertLinkName.innerHTML = "الاسم يجب ان يبده بحرف و اقل عدد من الحروف هو 4 و اكبر عدد من الحروف هو 20 و تستطيع ان تكتب حروف او ارقام فقط و لا يحتوى على فراغات"
        return;
    } else {
        linkNameTest = true
        alertLinkName.classList.add('d-none');
        alertLinkName.classList.remove('d-block');
        return;
    }
})
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
        alertCPassword.classList.add('d-block');
        alertCPassword.classList.remove('d-none');
        alertCPassword.innerHTML = "كلمة المرور يجب أن تحتوي على على الأقل 8 أحرف تتكون من حرف كبير وحرف صغير ورقم و نقبل اللغه الانجليزيه فقط لا غير"
        return;
    } else {
        cPasswordTest = true
        alertCPassword.classList.add('d-none');
        alertCPassword.classList.remove('d-block');
        if (password.value === cPassword.value && alertMessage.textContent == "كلمات المرور غير متطابقة") {
            alertMessage.classList.add('d-none');
            alertMessage.classList.remove('d-block');
        }
        return;
    }
})
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const userName = userNameInput.value
    const linkName = linkNameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    const cPassword = cPasswordInput.value
    const gender = genderInput.value
    const checkedbox = document.querySelector("#readAndAccept").checked

    if (!userNameTest || !linkNameTest || !emailTest || !passwordTest || !cPasswordTest) {
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
    if (gender == "false") {
        alertGender.classList.add('d-block');
        alertGender.classList.remove('d-none');
        alertGender.innerHTML = "يجب التحديد اذا كنت ذكر او انثى"
        return;
    } else {
        alertGender.classList.add('d-none');
        alertGender.classList.remove('d-block');
    }
    if (!checkedbox) {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = "يجب أن تقرأ و توافق على الشروط و القوانين"
        return;
    } else {
        alertMessage.classList.add('d-none');
        alertMessage.classList.remove('d-block');
    }
    const user = {
        userName,
        email,
        linkName,
        password,
        cPassword,
        gender,
    }
    const response = await fetch('https://saraha-gilt.vercel.app/auth/signup', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const result = await response.json()
    if (result.message == "Done") {
        window.location.href = "./verifyEmail.html"
    } else if (result.message == "linkName exist") {
        alertEmail.classList.add('d-block');
        alertEmail.classList.remove('d-none');
        alertEmail.innerHTML = `هذا الاسم مستخدم بالفعل`
    } else if (result.message == "Email exist") {
        alertLinkName.classList.add('d-block');
        alertLinkName.classList.remove('d-none');
        alertLinkName.innerHTML = `هذا البريد الالكترونى مستخدم بالفعل`
    } else if (result.message == "Enter correct email") {
        alertEmail.classList.add('d-block');
        alertEmail.classList.remove('d-none');
        alertEmail.innerHTML = `هذا البريد الالكترونى وهمى (غير موجود فالحقيقه) من فضلك ادخل بريدك الالكترونى بشكل صحيح`
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