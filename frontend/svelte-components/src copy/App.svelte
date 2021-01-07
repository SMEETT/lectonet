<script>
    import Dropdown from "../src/components/Dropdown.svelte";

    import {
        dropdownData_groups,
        dropdownData_occupations,
        dropdownData_services,
        dropdownData_types,
    } from "./stores/stores.js";

    import {
        selected_group,
        selected_occupation,
        selected_service,
        selected_type,
        surcharges,
    } from "./stores/stores.js";

    function handleDropdownChange(event) {
        console.log({ $selected_group });
        console.log({ $selected_occupation });
        console.log({ $selected_service });
        console.log({ $selected_type });
        console.log({ $surcharges });
    }
</script>

<!-- MARKUP /////////////////////////////////////////////////////////////////////////////////////// -->
<div class="preisrechner-wrapper">
    <form on:change|preventDefault={handleDropdownChange}>
        <Dropdown options={$dropdownData_groups} category={'group'} />
        {#if $selected_group.id <= 1}
            <Dropdown
                options={$dropdownData_occupations}
                category={'occupation'} />
        {/if}
        <Dropdown options={$dropdownData_services} category={'service'} />
        <Dropdown options={$dropdownData_types} category={'type'} />
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
