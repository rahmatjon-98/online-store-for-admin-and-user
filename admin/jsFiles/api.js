let api = "http://localhost:3000/product";

import getData from "./dom.js";
import { getInfo } from "./dom.js";
async function get() {
  try {
    let { data } = await axios.get(api);
    getData(data);
  } catch (error) {}
}

async function sortProduct() {
  try {
    let { data } = await axios.get(api);
    data.sort((a, b) => a.productName.localeCompare(b.productName));
    localStorage.setItem("sort", JSON.stringify(data));
    getData(data);
  } catch (error) {}
}

async function addProduct(newProduct) {
  try {
    await axios.post(api, newProduct);
    get();
  } catch (error) {}
}

async function editProduct(newProduct, id) {
  try {
    await axios.put(`${api}/${id}`, newProduct);
    get();
  } catch (error) {}
}

async function deleteProduct(id) {
  try {
    let { data } = await axios.delete(`${api}/${id}`);
    console.log(data);
    get();
  } catch (error) {}
}

async function changeStatus(e) {
  try {
    await axios.put(`${api}/${e.id}`, {
      ...e,
      productStatus: !e.productStatus,
    });
    get();
  } catch (error) {}
}

async function infoProduct(id) {
  try {
    let { data } = await axios.get(`${api}/${id}`);
    console.log(data);
    getInfo(data);
  } catch (error) {}
}

async function search(value) {
  try {
    let { data } = await axios.get(`${api}?productName=${value}`);
    getData(data);
  } catch (error) {}
}

async function searchCot(value) {
  if (value === "all") {
    get();
  } else {
    try {
      let { data } = await axios.get(`${api}?productCotegory=${value}`);
      getData(data);
    } catch (error) {}
  }
}

async function searchStatus(value) {
  if (value == "all") {
    get();
  } else {
    try {
      let { data } = await axios.get(
        `${api}?productStatus=${value == "active"}`
      );
      getData(data);
    } catch (error) {}
  }
}

export default get;

export {
  sortProduct,
  addProduct,
  editProduct,
  deleteProduct,
  infoProduct,
  search,
  searchStatus,
  changeStatus,
  searchCot,
};
