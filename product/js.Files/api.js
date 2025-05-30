import getData from "./dom.js";
let apiProduct = "http://localhost:3000/product";

async function get() {
  try {
    let { data } = await axios.get(apiProduct);
    getData(data);
  } catch (error) {
    console.error(error);
  }
}

async function Search(value) {
  try {
    let { data } = await axios.get(`${apiProduct}?productName=${value}`);
    getData(data);
  } catch (error) {
    console.error(error);
  }
}

async function cotegorySearch(value) {
  if (value == "all") {
    get();
  } else {
    try {
      let { data } = await axios.get(`${apiProduct}?productCotegory=${value}`);
      getData(data);
    } catch (error) {
      console.error(error);
    }
  }
}

async function rangeChange(max) {
  try {
    let { data } = await axios.get(apiProduct);
    getData(data.filter((e) => e.productPrice <= max));
  } catch (error) {
    console.error(error);
  }
}
export default get;

export { Search, cotegorySearch, rangeChange };
