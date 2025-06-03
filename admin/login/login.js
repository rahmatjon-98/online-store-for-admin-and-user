let api = "http://localhost:3000/admin";

let admin = localStorage.getItem("admin");
if (admin) {
  window.location = "../admin.html";
}

let inpName = document.querySelector(".inpName");
let inpEmail = document.querySelector(".inpEmail");
let inpPassword = document.querySelector(".inpPassword");
let btnSign = document.querySelector(".btnSign");

btnSign.onclick = async () => {
  try {
    let { data } = await axios.get(api);
    let adminData = data[0];
    if (
      inpName.value == adminData.adminName &&
      inpEmail.value == adminData.adminEmail &&
      inpPassword.value == adminData.password
    ) {
      localStorage.setItem("admin", "admin");
      window.location = "../admin.html";
    } else {
      alert("Incorrect login or password. Try again.");
    }
  } catch (error) {
    alert("An error occurred. Try again later.");
  }
};
