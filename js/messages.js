const successMessage = document.querySelector("#successMessage")
const closeSuccessMessage = document.querySelector("#successMessage i")
const successMessageText = document.querySelector("#successMessage p")
const copyLinkBtn = document.querySelector(".copy-link")
const messageDiv = document.querySelector("#messages")
const alertMessage = document.querySelector("#alert")
const favoriteMessages = document.querySelector("#favoriteMessages")
const sentMesages = document.querySelector("#sentMesages")
const sentMesagesFelter = document.querySelector("#sentMesagesFelter")
const token = localStorage.getItem("token")
document.addEventListener("DOMContentLoaded", async (e) => {
  const profileImage = document.querySelector("#profileImage")
  const userNameHeader = document.querySelector("#userNameHeader")
  if (!token) {
    window.location.href = "./signin.html"
  }
  const userResponse = await fetch("https://saraha-gilt.vercel.app/user", {
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
  const userData = await userResponse.json()
  let wishListMessages = []
  if (userData.message == "Done") {
    const { image, userName, userLink, wishList } = userData.user
    if (image?.secure_url) {
      profileImage.setAttribute("src", image.secure_url)
    }
    userNameHeader.innerHTML = userName
    copyLinkBtn.innerHTML = userLink
    if (wishList.length) {
      wishListMessages = wishList
      let messageContainer = ``;
      for (const message of wishList) {
        console.log(message);
        const date = `${message.date.split("T")[1].split(".")[0]} ` + message.date.split("T")[0];
        const id = message._id
        let favoriteCheck = "text-black-50"
        if (wishListMessages.length) {
          for (let i = 0; i < wishListMessages.length; i++) {
            if (wishListMessages[i]._id.toString() == message._id.toString()) {
              favoriteCheck = "text-warning"
            }
          }
        }
        messageContainer += `
                        <div id="message" class="rounded-3 bg-light mt-3">
                <div
                  class="d-flex align-items-center justify-content-between rounded-top-3 bg-body-secondary bg-opacity-50 p-2"
                >
                  <div
                    class="d-flex align-items-center justify-content-end gap-3 text-end"
                  >
                    <img
                      src="../images/anonymous.png"
                      class="rounded-circle"
                      alt="anonymous"
                    />
                    <div class="">
                      <p class="m-0 fw-bold">
                        مجهول
                        <img
                          src="../images/689023-dot.svg"
                          class="dot mx-1"
                          alt="."
                        />
                        <span class="fw-medium text-black-50 fs-8"
                          >${date}</span
                        >
                      </p>
                      <p class="m-0 fs-8 text-black-50">
                        <i class="fa-solid fa-lock"></i> رساله سريه
                      </p>
                    </div>
                  </div>
                  <div class="">
                    <a onclick="addToWishList('${id}')" messageId="${id}"><i id="favoriteIcon" class="fa-solid ms-2 ${favoriteCheck} fa-star"></i></a>
                  </div>
                </div>
                <div class="p-3">
                  <p id="">
                    <a>
                     ${message.text}
                    </a>
                  </p>
                  <a onclick="deleteMessageFromWishList('${id}')" class="btn text-white delete w-100"> حذف الرسالة</a>
                </div>
                               <p
                    id="alert"
                    class="alert alert-danger d-none text-end p-2"
                  ></p>
              </div>
            `
      }
      favoriteMessages.innerHTML = messageContainer
    }
  } else if (userData.message == "Expire token" || userData.message == "TokenExpiredError: jwt expired") {
    localStorage.removeItem("token")
    window.location.href = "./signin.html"
  }
  const response = await fetch("https://saraha-gilt.vercel.app/message/receivedMessages?sort=-createdAt", {
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
  const messageData = await response.json()
  if (messageData.message == "Done") {
    // messages
    document.querySelector("#loadPage").classList.add("d-none")
    let messageContainer = ``;
    for (const message of messageData.messages) {
      const date = `${message.date.split("T")[1].split(".")[0]} ` + message.date.split("T")[0];
      const id = message._id
      let favoriteCheck = "text-black-50"
      if (wishListMessages.length) {
        for (let i = 0; i < wishListMessages.length; i++) {
          if (wishListMessages[i]._id.toString() == message._id.toString()) {
            favoriteCheck = "text-warning"
          }
        }
      }
      messageContainer += `
                        <div id="message" class="rounded-3 bg-light mt-3">
                <div
                  class="d-flex align-items-center justify-content-between rounded-top-3 bg-body-secondary bg-opacity-50 p-2"
                >
                  <div
                    class="d-flex align-items-center justify-content-end gap-3 text-end"
                  >
                    <img
                      src="../images/anonymous.png"
                      class="rounded-circle"
                      alt="anonymous"
                    />
                    <div class="">
                      <p class="m-0 fw-bold">
                        مجهول
                        <img
                          src="../images/689023-dot.svg"
                          class="dot mx-1"
                          alt="."
                        />
                        <span class="fw-medium text-black-50 fs-8"
                          >${date}</span
                        >
                      </p>
                      <p class="m-0 fs-8 text-black-50">
                        <i class="fa-solid fa-lock"></i> رساله سريه
                      </p>
                    </div>
                  </div>
                  <div class="">
                    <a onclick="addToWishList('${id}')"<i id="favoriteIcon" messageId="${id}" class="fa-solid ms-2 ${favoriteCheck} fa-star"></i></a>
                  </div>
                </div>
                <div class="p-3">
                  <p id="">
                    <a>
                     ${message.text}
                    </a>
                  </p>
                  <a onclick="deleteMessage('${id}')" class="btn text-white delete w-100"> حذف الرسالة</a>
                </div>
                               <p
                    id="alert"
                    class="alert alert-danger d-none text-end p-2"
                  ></p>
              </div>
            `
    }
    messageDiv.innerHTML = messageContainer
  } else if (messageData.message == "Expire token" || messageData.message == "TokenExpiredError: jwt expired") {
    localStorage.removeItem("token")
    window.location.href = "./signin.html"
  }
  const sentMesagesResponse = await fetch("https://saraha-gilt.vercel.app/message/sentMessages?sort=-createdAt", {
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
  const sentMesagesData = await sentMesagesResponse.json()
  if (sentMesagesData.message == "Done") {
    // messages
    let messageContainer = ``;
    console.log(sentMesagesData);
    for (const message of sentMesagesData.messages) {
      const date = `${message.date.split("T")[1].split(".")[0]} ` + message.date.split("T")[0];
      const id = message._id
      console.log(message.receiver);
      const userImage = message.receiver.image?.secure_url ? message.receiver.image.secure_url : "../images/anonymous.png"
      const name =message.receiver.userName
      let favoriteCheck = "text-black-50"
      if (wishListMessages.length) {
        for (let i = 0; i < wishListMessages.length; i++) {
          if (wishListMessages[i]._id.toString() == message._id.toString()) {
            favoriteCheck = "text-warning"
          }
        }
      }
      messageContainer += `
                        <div id="message" class="rounded-3 bg-light mt-3">
                <div
                  class="d-flex align-items-center justify-content-between rounded-top-3 bg-body-secondary bg-opacity-50 p-2"
                >
                  <div
                    class="d-flex align-items-center justify-content-end gap-3 text-end"
                  >
                    <img
                      src="${userImage}"
                      class="rounded-circle"
                      alt="anonymous"
                    />
                    <div class="">
                      <p class="m-0 fw-bold">
                        ${name}
                        <img
                          src="../images/689023-dot.svg"
                          class="dot mx-1"
                          alt="."
                        />
                        <span class="fw-medium text-black-50 fs-8"
                          >${date}</span
                        >
                      </p>
                      <p class="m-0 fs-8 text-black-50">
                        <i class="fa-solid fa-lock"></i> رساله سريه
                      </p>
                    </div>
                  </div>
                </div>
                <div class="p-3">
                  <p id="">
                    <a>
                     ${message.text}
                    </a>
                  </p>
                  <a onclick="deleteMessage('${id}')" class="btn text-white delete w-100"> حذف الرسالة</a>
                </div>
                               <p
                    id="alert"
                    class="alert alert-danger d-none text-end p-2"
                  ></p>
              </div>
            `
    }
    sentMesages.innerHTML = messageContainer
  } else if (sentMesagesData.message == "Expire token" || sentMesagesData.message == "TokenExpiredError: jwt expired") {
    localStorage.removeItem("token")
    window.location.href = "./signin.html"
  }
})
const addToWishList = async (id) => {
  const favoriteIcon = document.querySelector(`#favoriteIcon[messageId="${id}"]`)
  console.log(favoriteIcon);
  if (favoriteIcon.classList.contains("text-black-50")) {
    const response = await fetch(`https://saraha-gilt.vercel.app/message/${id}/wishList/add`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    })
    const wishListMessage = await response.json()
    if (wishListMessage.message == "Done") {
      favoriteIcon.classList.add("text-warning")
      favoriteIcon.classList.remove("text-black-50")
      await successMessageFunction("تمت اضافه الرساله فى المفضله بنجاح")

    } else if (wishListMessage.message == "In-valid message id") {
      alertMessage.classList.add("d-block")
      alertMessage.classList.remove("d-none")
      alertMessage.innerHTML = "هذه الرساله غير متاحه "
    } else if (wishListMessage.message == "this message is in your wishlist") {
      alertMessage.classList.add("d-block")
      alertMessage.classList.remove("d-none")
      alertMessage.innerHTML = "هذه الرساله موجوده بالفعل فى المفضله "
      window.location.href = "./signin.html"
    } else if (wishListMessage.message == "Expire token" || wishListMessage.message == "TokenExpiredError: jwt expired") {
      localStorage.removeItem("token")
      window.location.href = "./signin.html"
    }
  } else {
    const response = await fetch(`https://saraha-gilt.vercel.app/message/${id}/wishList/remove`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    })
    const wishListMessage = await response.json()
    if (wishListMessage.message == "Done") {
      favoriteIcon.classList.add("text-black-50")
      favoriteIcon.classList.remove("text-warning")
      await successMessageFunction("تمت ازاله الرساله من المفضله بنجاح")
    } else if (wishListMessage.message == "In-valid message id") {
      alertMessage.classList.add("d-block")
      alertMessage.classList.remove("d-none")
      alertMessage.innerHTML = "هذه الرساله غير متاحه "
    } else if (wishListMessage.message == "This message is not in your wishList") {
      alertMessage.classList.add("d-block")
      alertMessage.classList.remove("d-none")
      alertMessage.innerHTML = "هذه الرساله غير موجوده بالفعل فى المفضله "
      window.location.href = "./signin.html"
    } else if (wishListMessage.message == "Expire token" || wishListMessage.message == "TokenExpiredError: jwt expired") {
      localStorage.removeItem("token")
      window.location.href = "./signin.html"
    }
  }
}
const deleteMessageFromWishList = async (id) => {
  const favoriteIcon = document.querySelector("#favoriteIcon")
  const response = await fetch(`https://saraha-gilt.vercel.app/message/${id}/wishList/remove`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
  const wishListMessage = await response.json()
  console.log(wishListMessage.message);
  if (wishListMessage.message == "Done") {
    console.log(favoriteIcon);
    favoriteIcon.classList.add("text-black-50")
    favoriteIcon.classList.remove("text-warning")
    await successMessageFunction("تمت ازاله الرساله من المفضله بنجاح")
  } else if (wishListMessage.message == "In-valid message id") {
    alertMessage.classList.add("d-block")
    alertMessage.classList.remove("d-none")
    alertMessage.innerHTML = "هذه الرساله غير متاحه "
  } else if (wishListMessage.message == "This message is not in your wishList") {
    alertMessage.classList.add("d-block")
    alertMessage.classList.remove("d-none")
    alertMessage.innerHTML = "هذه الرساله غير موجوده بالفعل فى المفضله "
    window.location.href = "./signin.html"
  } else if (wishListMessage.message == "Expire token" || wishListMessage.message == "TokenExpiredError: jwt expired") {
    localStorage.removeItem("token")
    window.location.href = "./signin.html"
  }
}
const deleteMessage = async (id) => {
  const response = await fetch(`https://saraha-gilt.vercel.app/message/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    }
  })
  const deleteMessage = await response.json()
  if (deleteMessage.message == "Done") {
    window.location.href = "./messages.html"
  } else if (deleteMessage.message == "In-valid message") {
    alertMessage.classList.add("d-block")
    alertMessage.classList.remove("d-none")
    alertMessage.innerHTML = "هذه الرساله غير متاحه "
  } else if (deleteMessage.message == "Expire token" || deleteMessage.message == "TokenExpiredError: jwt expired") {
    localStorage.removeItem("token")
    window.location.href = "./signin.html"
  }
}
const copyLink = async (e) => {
  const link = copyLinkBtn.innerHTML;
  console.log(link);
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
copyLinkBtn.addEventListener("click", copyLink)
closeSuccessMessage.addEventListener("click", disappearSuccessMessage)