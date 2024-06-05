const updateProfileForm = document.querySelector("#updateProfile")
const updatePasswordForm = document.querySelector("#updatePassword")
const stopProfileButton = document.querySelector("#stopProfile")
const updateProfileImageForm = document.querySelector("#updateProfileImage")
const profileImageInput = document.querySelector("#profileImageInput")
const userNameInput = document.querySelector("#userName")
const linkNameInput = document.querySelector("#linkName")
const emailInput = document.querySelector("#email")
const genderInput = document.querySelector("#gender")
const profileImage = document.querySelector("#profileImage")
const alertUserName = document.querySelector("#alertUserName")
const alertLinkName = document.querySelector("#alertLinkName")
const alertEmail = document.querySelector("#alertEmail")
const alertOldPassword = document.querySelector("#alertOldPassword")
const alertNewPassword = document.querySelector("#alertNewPassword")
const alertProfile = document.querySelector("#alertProfile")
const alertMessage = document.querySelector("#alert")
const alertProfileImage = document.querySelector("#alertProfileImage")
const oldPasswordInput = document.querySelector("#oldPassword")
const newPasswordInput = document.querySelector("#newPassword")
const newCPasswordInput = document.querySelector("#newCPassword")
const deleteProfileImageButton = document.querySelector("#deleteProfileImage")
const deleteImage = document.querySelector("#deleteImage")
const copyLinkBtn = document.querySelector(".copy-link")
const successMessage = document.querySelector("#successMessage")
const closeSuccessMessage = document.querySelector("#successMessage i")
const successMessageText = document.querySelector("#successMessage p")
let userNameTest = true
userNameInput.addEventListener("input", () => {
    const nameRegex = /^[A-Za-zء-ي][A-Z 0-9a-zء-ي]{2,20}$/
    if (!nameRegex.test(userNameInput.value)) {
        alertUserName.classList.add('d-block');
        alertUserName.classList.remove('d-none');
        alertUserName.innerHTML = "الاسم يجب ان يبده بحرف و اقل عدد من الحروف هو 4 و اكبر عدد من الحروف هو 20 و تستطيع ان تكتب حروف او ارقام فقط "
        userNameTest = false
        return;
    } else {
        userNameTest = true
        alertUserName.classList.add('d-none');
        alertUserName.classList.remove('d-block');
        return;
    }
})
let linkNameTest = true
linkNameInput.addEventListener("input", () => {
    const linkNameRegex = /^[A-Za-zء-ي][A-Z0-9a-zء-ي]{2,20}$/
    if (!linkNameRegex.test(linkNameInput.value)) {
        alertLinkName.classList.add('d-block');
        alertLinkName.classList.remove('d-none');
        alertLinkName.innerHTML = "الاسم يجب ان يبده بحرف و اقل عدد من الحروف هو 4 و اكبر عدد من الحروف هو 20 و تستطيع ان تكتب حروف او ارقام فقط و لا يحتوى على فراغات"
        linkNameTest = false
        return;
    } else {
        linkNameTest = true
        alertLinkName.classList.add('d-none');
        alertLinkName.classList.remove('d-block');
        return;
    }
})
let emailTest = true
emailInput.addEventListener("input", () => {
    const emailRegex = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(emailInput.value)) {
        alertEmail.classList.add('d-block');
        alertEmail.classList.remove('d-none');
        alertEmail.innerHTML = "من فضلك ادخل بريد الكترونى صحيح"
        emailTest = false
        return
    } else {
        emailTest = true
        alertEmail.classList.add('d-none');
        alertEmail.classList.remove('d-block');
        return;
    }
})
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
let oldPasswordTest = false
oldPasswordInput.addEventListener("input", () => {
    if (!passwordRegex.test(oldPasswordInput.value)) {
        alertOldPassword.classList.add('d-block');
        alertOldPassword.classList.remove('d-none');
        alertOldPassword.innerHTML = "كلمة المرور يجب أن تحتوي على على الأقل 8 أحرف تتكون من حرف كبير وحرف صغير ورقم و نقبل اللغه الانجليزيه فقط لا غير"
        return
    } else {
        oldPasswordTest = true
        alertOldPassword.classList.add('d-none');
        alertOldPassword.classList.remove('d-block');
        return;
    }
})
let newPasswordTest = false
newPasswordInput.addEventListener("input", () => {
    if (!passwordRegex.test(newPasswordInput.value)) {
        alertNewPassword.classList.add('d-block');
        alertNewPassword.classList.remove('d-none');
        alertNewPassword.innerHTML = "كلمة المرور يجب أن تحتوي على على الأقل 8 أحرف تتكون من حرف كبير وحرف صغير ورقم و نقبل اللغه الانجليزيه فقط لا غير"
        return
    } else {
        newPasswordTest = true
        alertNewPassword.classList.add('d-none');
        alertNewPassword.classList.remove('d-block');
        if (newPasswordInput.value === newCPasswordInput.value && alertMessage.textContent == "كلمات المرور غير متطابقة") {
            alertMessage.classList.add('d-none');
            alertMessage.classList.remove('d-block');
        }
        return;
    }
})
let newCPasswordTest = false
newCPasswordInput.addEventListener("input", () => {
    if (!passwordRegex.test(newCPasswordInput.value)) {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = "كلمة المرور يجب أن تحتوي على على الأقل 8 أحرف تتكون من حرف كبير وحرف صغير ورقم و نقبل اللغه الانجليزيه فقط لا غير"
        return;
    } else {
        newCPasswordTest = true
        alertMessage.classList.add('d-none');
        alertMessage.classList.remove('d-block');
        if (newPasswordInput.value === newCPasswordInput.value && alertMessage.textContent == "كلمات المرور غير متطابقة") {
            alertMessage.classList.add('d-none');
            alertMessage.classList.remove('d-block');
        }
        return;
    }
})
let profileImageTest = true
profileImageInput.addEventListener("change", (e) => {
    if (!profileImageInput.files?.length) {
        alertProfileImage.classList.add('d-block');
        alertProfileImage.classList.remove('d-none');
        alertProfileImage.innerHTML = "يجب ان تختار صورة لاضافتها"
        profileImageTest = false
        return;
    } else {
        profileImageTest = true
        alertProfileImage.classList.add('d-none');
        alertProfileImage.classList.remove('d-block');
    }
})
const token = localStorage.getItem("token")
let lastEmail;
document.addEventListener("DOMContentLoaded", async (e) => {
    const userNameHeader = document.querySelector("#userNameHeader")
    if (!token) {
        window.location.href = "./signin.html"
    }
    const response = await fetch("https://saraha-gilt.vercel.app/user", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
    const profileResult = await response.json()
    if (profileResult.message == "Done") {
            document.querySelector("#loadPage").classList.add("d-none")
        const { image, userName, email, gender, userLink, linkName, stopped } = profileResult.user
        if (image?.secure_url) {
            deleteImage.classList.add('d-block');
            deleteImage.classList.remove('d-none');
        } else {
            deleteImage.classList.add('d-none');
            deleteImage.classList.remove('d-block');
        }
        userNameHeader.innerHTML = userName
        copyLinkBtn.innerHTML = userLink
        lastEmail = email
        userNameInput.value = userName
        linkNameInput.value = linkName
        emailInput.value = email
        genderInput.value = gender
        profileImage.setAttribute("src", image.secure_url)

        if (stopped) {
            stopProfileButton.innerHTML = "تشغيل الحساب"
            stopProfileButton.style.backgroundColor = "#10bbb3"
        } else {
            stopProfileButton.style.backgroundColor = "#f1786c"
            stopProfileButton.innerHTML = "ايقاف الحساب"
        }
    } else if (profileResult.message == "Expire token" || profileResult.message == "TokenExpiredError: jwt expired") {
        localStorage.removeItem("token")
        window.location.href = "./signin.html"
    }
})
const updateProfile = async (e) => {
    e.preventDefault()
    if (!userNameTest || !linkNameTest || !emailTest) {
        return;
    }
    const data = {
        userName: userNameInput.value,
        linkName: linkNameInput.value,
        email: emailInput.value,
        gender: genderInput.value
    }
    const response = await fetch("https://saraha-gilt.vercel.app/user", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
    const updateProfile = await response.json()
    console.log(updateProfile);
    if (updateProfile.message == "Done") {
        if (data.email == lastEmail) {
            window.location.href = "./profile.html"
        } else if (profileResult.message == "Expire token" || profileResult.message == "TokenExpiredError: jwt expired") {
            localStorage.removeItem("token")
            window.location.href = "./signin.html"
        } else {
            localStorage.removeItem("token")
            window.location.href = "./verifyEmail.html"
        }
    } else if (updateProfile.message == "linkNamw exist") {
        alertLinkName.classList.add('d-block');
        alertLinkName.classList.remove('d-none');
        alertLinkName.innerHTML = "هذا الاسم مستخدم بالفعل"
        return;
    } else if (updateProfile.message == "Email exist") {
        alertEmail.classList.add('d-block');
        alertEmail.classList.remove('d-none');
        alertEmail.innerHTML = "هذا البريد الالكترونى مستخدم بالفعل"
        return;
    } else if (updateProfile.message == "Enter correct email") {
        alertEmail.classList.add('d-block');
        alertEmail.classList.remove('d-none');
        alertEmail.innerHTML = `هذا البريد الالكترونى وهمى (غير موجود فالحقيقه) من فضلك ادخل بريدك الالكترونى بشكل صحيح`
    } else {
        let errors = '';
        for (const err of result.error) {
            errors += `${err.message}..........`
        }
        alertProfile.classList.add('d-block');
        alertProfile.classList.remove('d-none');
        alertProfile.innerHTML = `Server error ............ ${errors}`
        return;
    }
}
const updatePassword = async (e) => {
    e.preventDefault()
    if (!oldPasswordTest || !newPasswordTest || !newCPasswordTest) {
        return;
    }
    if (newPasswordInput.value != newCPasswordInput.value) {
        alertMessage.classList.add('d-block');
        alertMessage.classList.remove('d-none');
        alertMessage.innerHTML = "كلمات المرور غير متطابقة"
        return;
    } else {
        alertMessage.classList.add('d-none');
        alertMessage.classList.remove('d-block');
    }
    const data = {
        oldPassword: oldPasswordInput.value,
        password: newPasswordInput.value,
        cPassword: newCPasswordInput.value,
    }
    const response = await fetch("https://saraha-gilt.vercel.app/user/updatePassword", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
    const updatePassword = await response.json()
    console.log(updatePassword.message);

    if (updatePassword.message == "Done") {
        await successMessageFunction("تم تعديل كلمه المرور بنجاح")
        oldPasswordInput.value = ""
        newPasswordInput.value = ""
        newCPasswordInput.value = ""
    } else if (updatePassword.message == "Expire token" || updatePassword.message == "TokenExpiredError: jwt expired") {
        localStorage.removeItem("token")
        window.location.href = "./signin.html"
    } else if (updatePassword.message == "Password miss match") {
        alertOldPassword.classList.add('d-block');
        alertOldPassword.classList.remove('d-none');
        alertOldPassword.innerHTML = "تأكد من ادخال كلمه المرور بشكل صحيح"
        return;
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
const stopProfile = async (e) => {
    const response = await fetch("https://saraha-gilt.vercel.app/user/softdelete", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
    const stopAccount = await response.json()
    if (stopAccount.message == "Done") {
        window.location.href = "./profile.html"
    } else if (stopAccount.message == "Expire token" || stopAccount.message == "TokenExpiredError: jwt expired") {
        localStorage.removeItem("token")
        window.location.href = "./signin.html"
    }
}
const changeProfilePic = async (e) => {
    e.preventDefault()
    if (!profileImageTest) {
        return;
    }
    if (!profileImageInput.files?.length) {
        alertProfileImage.classList.add('d-block');
        alertProfileImage.classList.remove('d-none');
        alertProfileImage.innerHTML = "يجب ان تختار صورة لاضافتها"
        return;
    } else {
        alertProfileImage.classList.add('d-none');
        alertProfileImage.classList.remove('d-block');
    }
    const file = profileImageInput.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("https://saraha-gilt.vercel.app/user/profilPic", {
        method: "PATCH",
        body: formData,
        headers: {
            'authorization': token
        }
    })
    const updateProfileImage = await response.json()
    if (updateProfileImage.message == "Done") {
        window.location.href = "./profile.html"
    } else if (updateProfileImage.message == "Expire token" || updateProfileImage.message == "TokenExpiredError: jwt expired") {
        localStorage.removeItem("token")
        window.location.href = "./signin.html"
    }
    else {
        let errors = '';
        for (const err of updateProfileImage.error) {
            errors += `${err.message}..........`
        }
        alertProfileImage.classList.add('d-block');
        alertProfileImage.classList.remove('d-none');
        alertProfileImage.innerHTML = `Server error ............ ${errors}`
        return;
    }
}
const deleteProfileImage = async (e) => {
    const response = await fetch("https://saraha-gilt.vercel.app/user/deleteProfilePic", {
        method: "PATCH",
        headers: {
            'authorization': token
        }
    })
    const deleteProfilePic = await response.json()
    if (deleteProfilePic.message == "Done") {
        window.location.href = "./profile.html"
    } else if (deleteProfilePic.message == "Expire token" || deleteProfilePic.message == "TokenExpiredError: jwt expired") {
        localStorage.removeItem("token")
        window.location.href = "./signin.html"
    }
    else {
        let errors = '';
        for (const err of deleteProfilePic.error) {
            errors += `${err.message}..........`
        }
        alertProfileImage.classList.add('d-block');
        alertProfileImage.classList.remove('d-none');
        alertProfileImage.innerHTML = `Server error ............ ${errors}`
        return;
    }
}
const copyLink = async (e) => {
    const link = copyLinkBtn.innerHTML;
    await navigator.clipboard.writeText(link);
    await successMessageFunction("تم نسخ اللينك بنجاح")
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
updateProfileForm.addEventListener("submit", updateProfile)
updatePasswordForm.addEventListener("submit", updatePassword)
stopProfileButton.addEventListener("click", stopProfile)
updateProfileImageForm.addEventListener("submit", changeProfilePic)
deleteProfileImageButton.addEventListener("click", deleteProfileImage)
copyLinkBtn.addEventListener("click", copyLink)
closeSuccessMessage.addEventListener("click", disappearSuccessMessage)