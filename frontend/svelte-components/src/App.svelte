<script>
    import Dropdown from "../src/components/Dropdown.svelte";
    import QuantityTextfield from "../src/components/QuantityTextfield.svelte";
    import ButtonCalculate from "../src/components/ButtonCalculate.svelte";
    import BewerbungenCheckboxes from "../src/components/BewerbungCheckboxes.svelte";

    import {
        services,
        groups,
        types,
        selectedCategories,
    } from "./stores/stores.js";

    let dropdownDataGroups;
    let dropdownDataServices;
    let dropdownDataTypes;

    let selectedCategoriesTEMP;

    selectedCategories.subscribe((data) => {
        selectedCategoriesTEMP = data;
    });

    groups.subscribe((data) => {
        dropdownDataGroups = data;
    });
    services.subscribe((data) => {
        dropdownDataServices = data;
    });
    types.subscribe((data) => {
        dropdownDataTypes = data;
    });

    function handleDropdownChange(event) {
        const calculatorMidRegular = document.getElementById(
            "calculator-mid-1"
        );
        const calculatorMidBewerbung = document.getElementById(
            "calculator-mid-2"
        );
        if (selectedCategoriesTEMP.service === "Bewerbung") {
            calculatorMidRegular.style.display = "none";
            calculatorMidBewerbung.style.display = "flex";
        } else {
            calculatorMidRegular.style.display = "flex";
            calculatorMidBewerbung.style.display = "none";
        }
    }
</script>

<!-- MARKUP /////////////////////////////////////////////////////////////////////////////////////// -->
<div class="preisrechner-wrapper">
    <div class="preisrechner-title">
        <span class="title">Preisrechner</span>
        <div class="close-icon" id="calculator-close-icon" />
    </div>
    <form on:change|preventDefault={handleDropdownChange}>
        <div class="calculator-top">
            <Dropdown
                label={'Sie sind'}
                options={dropdownDataGroups}
                category={'group'}
                id={'dropdown-group'}
                initialDisableStatus="false" />

            <Dropdown
                label={'Sie benötigen'}
                options={dropdownDataServices}
                category={'service'}
                id={'dropdown-service'}
                initialDisableStatus="true" />
        </div>
        <!-- the div rendered when anything but "Bewerbung" was selected -->
        <div class="calculator-mid-1" id="calculator-mid-1">
            <Dropdown
                label={'Art der Arbeit'}
                options={dropdownDataTypes}
                category={'type'}
                id={'dropdown-type'}
                initialDisableStatus="true" />
            <QuantityTextfield />
        </div>
        <!-- the div rendered when "Bewerbung" was selected -->
        <div class="calculator-mid-2" id="calculator-mid-2">
            <BewerbungenCheckboxes />
        </div>

        <div class="calculator-button">
            <ButtonCalculate />
        </div>
    </form>
    <hr style="width: 100%" />

    <!-- <form class="form-Email" on:submit|preventDefault>
        <p>email form</p>
    </form> -->
</div>

<!-- STYLES /////////////////////////////////////////////////////////////////////////////////////// -->
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        transition: 0.15s;
        font-family: Montserrat;
        font-style: normal;
        list-style: none;
    }
    .calculator-top {
        grid-column: 1 / 3;
        grid-row: 1;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .calculator-mid-1 {
        grid-column: 1 / 3;
        grid-row: 2;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .calculator-mid-2 {
        margin-top: 16px;
        padding-left: 34px;
        grid-column: 2 / 3;
        grid-row: 2;
        width: 100%;
        display: none;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .calculator-button {
        grid-column: 1 / 3;
        grid-row: 3;
        margin-top: 32px;
    }

    form {
        display: grid;
        /* column-gap: 20px; */
        /* row-gap: 16px; */
        /* grid-auto-flow: column; */
        justify-items: center;
        align-items: center;
        width: 100%;
        height: auto;
        /* border: 1px solid red; */
        padding: 0 50px 10px 50px;
        grid-template-columns: 50% 50%;
        grid-template-rows: auto auto auto auto;
    }

    .preisrechner-title {
        text-transform: uppercase;
        width: 100%;
        height: 40px;
        /* padding-top: 10px; */
        /* border: 1px solid red; */
        display: grid;
        grid-template-columns: 1fr repeat(8, 1fr) 1fr;
        justify-items: center;
        align-items: center;
        background-color: #f5f5f5;
        /* align-items: center; */
        /* border: 1px solid red; */
    }

    .title {
        /* border: 2px solid green; */
        grid-column-start: 2;
        grid-column-end: 10;
        font-weight: 700;
        font-size: 14px;
        /* text-decoration: underline; */
    }

    .close-icon {
        /* border: 1px solid blue; */
        background: url("../../../static/images/icon_calculator_close.svg")
            no-repeat;
        background-size: contain;
        width: 20px;
        height: 20px;
        grid-column-start: 10;
        margin-left: 0px;
    }

    .close-icon:hover {
        cursor: pointer;
        background: url("../../../static/images/icon_calculator_close_hover.svg")
            no-repeat;
        background-size: contain;
    }

    .preisrechner-wrapper {
        width: 700px;
        height: 800px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        position: static;
        margin: auto;
        margin-top: 60px;
        z-index: 30;
        box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.25);
        border-radius: 25px;
        overflow: hidden;
    }

    .right-2 {
        grid-area: right-2;
        justify-self: start;
        margin-left: 10px;
    }

    .price {
        grid-area: price;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 32px;
        /* border: 1px solid red; */
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
        .calculator-top {
            flex-direction: column;
        }
        .calculator-mid-2 {
            margin-top: 16px;
            /* padding-left: 34px; */
            grid-column: 1 / 3;
            grid-row: 2;
            width: 100%;
            display: none;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border: 1px solid red;
        }
        .calculator-mid-1 {
            flex-direction: column;
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
