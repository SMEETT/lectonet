import { writable } from 'svelte/store';
import axios from "axios";

const apiPath = process.env.apiPath || "http://localhost:1337";

const fetchedCSV = axios.get(`${apiPath}/preise`)

console.log(fetchedCSV)

