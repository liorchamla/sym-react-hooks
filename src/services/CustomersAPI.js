import http from "./http";

const getCustomers = () =>
  http
    .get("http://localhost:8000/api/customers")
    .then(response => response.data["hydra:member"]);

const getCustomer = id =>
  http
    .get("http://localhost:8000/api/customers/" + id)
    .then(response => response.data);

const updateCustomer = customer =>
  http
    .put("http://localhost:8000/api/customers/" + customer.id, customer)
    .then(response => response.data);

const createCustomer = customer =>
  http
    .post("http://localhost:8000/api/customers/", customer)
    .then(response => response.data);

export default {
  findAll: getCustomers,
  find: getCustomer,
  update: updateCustomer,
  create: createCustomer
};
