import { writable } from 'svelte/store';
import axios from "axios";

const apiPath = "http://localhost:1338"; // TODO: make sure to add environment

// dropdownData TEMP
const dropdownData_groups_TEMP = [{ id: 0, name: "Bitte auswählen", category: "group" }]
const dropdownData_occupations_TEMP = [{ id: 0, name: "Bitte auswählen", category: "occupation" }]
const dropdownData_services_TEMP = [{ id: 0, name: "Bitte auswählen", category: "service"}]
const dropdownData_types_TEMP = [{ id: 0, name: "Bitte auswählen", category: "type" }]

// containers to construct the array of objects, before assigning them
// to the exported writables();
const dropdownData_TEMP = [
    dropdownData_groups_TEMP,
    dropdownData_occupations_TEMP,
    dropdownData_services_TEMP,
    dropdownData_types_TEMP,
];

// dropdownData
export const dropdownData_groups = writable([]);
export const dropdownData_occupations = writable([]);
export const dropdownData_services = writable([]);
export const dropdownData_types = writable([]);

const dropdownData = [
    dropdownData_groups,
    dropdownData_occupations,
    dropdownData_services,
    dropdownData_types,
];

export let selected_group = writable(dropdownData_groups_TEMP[0]);
export let selected_occupation = writable(dropdownData_occupations_TEMP[0]);
export let selected_service = writable(dropdownData_services_TEMP[0]);
export let selected_type = writable(dropdownData_types_TEMP[0]);

const selected = [
    selected_group,
    selected_occupation,
    selected_service,
    selected_type,
];

export let surcharges = writable();

// empty promise that doesn't resolve, to prevent dropdowns from rendering
let promiseDropdownData = new Promise((resolve, reject) => {});

// fetch all data from the API/DB, return promises
async function fetchData() {
    console.log("fetchData() start...");
    const res_groups = axios.get(`${apiPath}/api/groups`);
    const res_occupations = axios.get(`${apiPath}/api/occupations`);
    const res_services = axios.get(`${apiPath}/api/services`);
    const res_types = axios.get(`${apiPath}/api/types`);
    const res_surcharges = axios.get(`${apiPath}/api/surcharges`);
    console.log("fetchData() end...");
    return Promise.all([
        res_groups,
        res_occupations,
        res_services,
        res_types,
        res_surcharges,
    ]);
}
// call fetchData(), .then() clean up fetched data and pass it on
fetchData().then((data) => {
    console.log("fetchData().then() start...");
    // pop (last) element from received data-array (which contains "surcharges")
    // pop() returns the popped element and we assign its .data property to a variable
    surcharges.set(data.pop().data);
    // extract each .data property from the remaining elements and mutate the array
    // TODO: prolly bad practice
    data.forEach((entry, index) => {
        data[index] = data[index].data;
    });
    // pass data to populateDropdownArrays() (which returns a promise)
    // assign returned promise to promiseDropdownData (allow the (awaiting) dropdowns to render)
    promiseDropdownData = populateDropdownArrays(data);
    console.log("fetchData().then() end...");
});

function populateDropdownArrays(data) {
    console.log("populateDropdownArrays() start...");
    console.log(data);
    return new Promise((resolve, reject) => {
        dropdownData_TEMP.forEach((dropdown, index) => {
            for (let i = 0; i < data[index].length; i++) {
                dropdown.push(data[index][i]);
            }
            dropdownData[index].set(dropdownData_TEMP[index])
        });
        console.log("populateDropdownArrays() end...");
        return resolve();
    });
}