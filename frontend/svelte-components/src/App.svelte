<script>
    import Dropdown from "../src/components/Dropdown.svelte";
    import pp from "papaparse";
    import axios from "axios";

    const options = ["opt1", "opt2"];

    let dropdownDataGroups = [];
    let dropdownDataServices = [];
    let dropdownDataTypes = [];

    const apiPath = "http://localhost:1337";

    const fetchedCSVData = axios.get(`${apiPath}/preise`);

    let prices = [];

    const PPConfig = { header: true };

    fetchedCSVData
        .then((data) => {
            const extractedData = data.data.Preis;
            // get all "Services" and add them to dropdownData
            extractedData.forEach((preis) => {
                dropdownDataServices.push(preis.leistung);
            });
            return extractedData;
        })
        .then((data) => {
            const promiseContainer = [];
            const CSVData = [];
            data.forEach((entry) => {
                const csvString = axios.get(`${apiPath}${entry.CSV.url}`);
                promiseContainer.push(csvString);
            });
            let allPromises = Promise.all(promiseContainer).then((data) => {
                data.forEach((entry, index) => {
                    CSVData.push({
                        service: dropdownDataServices[index],
                        csv: entry.data,
                    });
                });
                return CSVData;
            });
            return allPromises;
        })
        .then((data) => {
            const parsedData = [];
            data.forEach((entry) => {
                let service = entry.service;
                let parsed = pp.parse(entry.csv, PPConfig).data;
                parsed.forEach((element) => {
                    let type;
                    for (const [key, value] of Object.entries(element)) {
                        if (`${key}` === "") {
                            type = `${value}`;
                        } else {
                            let objectToPush = {
                                group: `${key}`,
                                service: service,
                                type: type,
                                price: `${value}`,
                            };
                            prices.push(objectToPush);
                        }
                    }
                });
                console.log(prices);
            });
        });

    function handleDropdownChange(event) {
        console.log("handleDropdownChange()");
    }
</script>

<!-- MARKUP /////////////////////////////////////////////////////////////////////////////////////// -->
<div class="preisrechner-wrapper">
    <form on:change|preventDefault={handleDropdownChange}>
        <Dropdown options={options} category={'group'} />
        <Dropdown options={options} category={'service'} />
        <Dropdown options={options} category={'type'} />
    </form>
</div>

<!-- STYLES /////////////////////////////////////////////////////////////////////////////////////// -->
<style>
    .preisrechner-wrapper {
        width: 700px;
        height: 860px;
        background-color: white;
        position: static;
        margin: auto;
        margin-top: 60px;
        border: 3px solid red;
        z-index: 30;
        box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.25);
        border-radius: 25px;
    }
    /* ----------- 1280-WIDTH */
    @media (min-width: 1280px) {
    }
    /* ----------- 960-WIDTH */
    @media (max-width: 1279px) {
    }
    /* ----------- 600-WIDTH */
    @media (max-width: 959px) {
        .preisrechner-wrapper {
            width: 512px;
            height: 998px;
            margin: auto;
            margin-top: 40px;
        }
    }
    /* ----------- 320-WIDTH */
    @media (max-width: 599px) {
        .preisrechner-wrapper {
            width: 300px;
            height: 1068px;
            margin: auto;
            margin-top: 10px;
        }
    }
</style>
