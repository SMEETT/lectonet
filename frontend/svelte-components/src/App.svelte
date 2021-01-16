<script>
    import Dropdown from "../src/components/Dropdown.svelte";
    import QuantityTextfield from "../src/components/QuantityTextfield.svelte";
    import ButtonCalculate from "../src/components/ButtonCalculate.svelte";

    import {
        services,
        groups,
        types,
        calculatedPrice,
    } from "./stores/stores.js";

    let dropdownDataGroups;
    let dropdownDataServices;
    let dropdownDataTypes;
    let calculatedPriceOutput;

    calculatedPrice.subscribe((price) => {
        calculatedPriceOutput = price;
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

    function handleDropdownChange(event) {}
</script>

<!-- MARKUP /////////////////////////////////////////////////////////////////////////////////////// -->
<div class="preisrechner-wrapper">
    <div class="preisrechner-title">
        <span class="title">Preisrechner</span>
        <img
            class="close-icon"
            src="../../static/images/icon_close.svg"
            alt="" />
    </div>
    <form
        class="form-Calculator"
        on:change|preventDefault={handleDropdownChange}>
        <div class="left-1">
            <Dropdown
                label={'Sie sind'}
                options={dropdownDataGroups}
                category={'group'}
                id={'dropdown-group'}
                initialDisableStatus="false" />
        </div>

        <div class="right-1">
            <Dropdown
                label={'Sie benötigen'}
                options={dropdownDataServices}
                category={'service'}
                id={'dropdown-service'}
                initialDisableStatus="true" />
        </div>

        <div class="left-2">
            <Dropdown
                label={'Art der Arbeit'}
                options={dropdownDataTypes}
                category={'type'}
                id={'dropdown-type'}
                initialDisableStatus="true" />
        </div>

        <div class="right-2">
            <QuantityTextfield />
        </div>

        <div class="price">
            <ButtonCalculate />
            <p>{calculatedPriceOutput} €</p>
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
    form {
        display: grid;
        justify-items: center;
        align-items: center;
        width: 100%;
        height: auto;
        /* border: 1px solid red; */
        padding: 10px 50px 10px 50px;
        grid-template-columns: 50% 50%;
        grid-template-rows: 80px 80px 150px auto;
        grid-template-areas:
            "left-1 right-1"
            "left-2 right-2"
            "price price"
            "e-mail e-mail";
    }

    .form-Calculator {
    }

    .form-Email {
    }

    .preisrechner-title {
        text-transform: uppercase;
        width: 100%;
        height: 38px;
        /* border: 1px solid red; */
        display: grid;
        grid-template-columns: 1fr repeat(8, 1fr) 1fr;
        justify-items: center;
        align-items: center;
        /* align-items: center; */
        /* border: 1px solid red; */
    }

    .title {
        /* border: 2px solid green; */
        grid-column-start: 2;
        grid-column-end: 10;
    }

    .close-icon {
        /* border: 1px solid blue; */
        grid-column-start: 10;
        margin-left: 20px;
    }

    .close-icon:hover {
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

    .left-1 {
        grid-area: left-1;
    }
    .right-1 {
        grid-area: right-1;
    }

    .left-2 {
        grid-area: left-2;
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

    p {
        font-size: 32px;
        font-weight: 700;
        font-family: Montserrat;
        grid-area: price;
        display: block;
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
