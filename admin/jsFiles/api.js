let api = "http://localhost:3000/product";

import getData from "./dom.js";

async function get() {
  try {
    let { data } = await axios.get(api);
    getData(data);
  } catch (error) {}
}

export default get;
