const input = document.getElementById("city");
const suggestionsList = document.querySelector(".city-list");
let currentIndex = -1;

input.addEventListener("input", async () => {
  const inputValue = input.value;
  suggestionsList.innerHTML = "";
  currentIndex = -1;

  if (inputValue.length > 0) {
    suggestionsList.classList.add("active");
  } else {
    suggestionsList.classList.remove("active");
    return;
  }

  if (inputValue.length < 1) return;

  const url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const token = "c2b3d4cce894089eea72c819cfd755be9e5ba00d";

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({ query: inputValue }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data && data.suggestions) {
      data.suggestions.forEach((suggestion, index) => {
        const li = document.createElement("li");
        li.textContent = suggestion.value;
        li.tabIndex = 0;

        li.addEventListener("click", () => {
          input.value = li.textContent;
          suggestionsList.innerHTML = "";
          suggestionsList.classList.remove("active");
        });

        suggestionsList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Ошибка", error);
  }
});

/////////////////////////////------------КЛАВА-------------/////////////////////////////////////////
input.addEventListener("keydown", (event) => {
  const items = suggestionsList.querySelectorAll("li");
  if (event.key === "ArrowDown") {
    currentIndex = (currentIndex + 1) % items.length;
    highlightItem(items);
  } else if (event.key === "ArrowUp") {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    highlightItem(items);
  } else if (event.key === "Enter") {
    if (currentIndex >= 0 && currentIndex < items.length) {
      items[currentIndex].click();
    }
  }
});

function highlightItem(items) {
  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add("highlight");
      item.scrollIntoView({ block: "nearest" });
    } else {
      item.classList.remove("highlight");
    }
  });
}

/////////////////////////////------------ПАРОЛЬ-------------/////////////////////////////////////////
const togglePassword = document.getElementById("togglePassword");
const generatePassword = document.getElementById("generatePassword");

togglePassword.addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  const iconSrc =
    type === "password" ? "./assets/svg/on.svg" : "./assets/svg/off.svg";
  this.setAttribute("src", iconSrc);
});

generatePassword.addEventListener("click", function () {
  const password = generateRandomPassword(12);
  document.getElementById("password").value = password;
  tip.textContent = "Сгенерирова новый пароль";
  tip.classList.add("active");
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    tip.classList.remove("active");
  }, 2000);
});

function generateRandomPassword(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

/////////////////////////////------------ОТПРАВКА ДАННЫХ В КОНСОЛЬ------------/////////////////////////////////////////
const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    Логин: document.getElementById("username").value,
    Пароль: document.getElementById("password").value,
    Фамилия: document.getElementById("lastName").value,
    Имя: document.getElementById("firstName").value,
    Отчество: document.getElementById("middleName").value,
    Адрес: document.getElementById("city").value,
  };

  console.log(JSON.stringify(formData, null, 2));

  tip.textContent = "Вы успешно зарегистрировались";
  tip.classList.add("active");
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    tip.classList.remove("active");
  }, 2000);
});

const submitButton = document.querySelector(".form-btn");
const checkbox = document.getElementById("check-form-id");

function updateSubmitButtonState() {
  if (checkbox.checked) {
    submitButton.disabled = false;
    submitButton.style.opacity = "1";
  } else {
    submitButton.disabled = true;
    submitButton.style.opacity = "0.5";
  }
}

checkbox.addEventListener("change", updateSubmitButtonState);

updateSubmitButtonState();
