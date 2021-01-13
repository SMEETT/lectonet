<script>
    import { selectedCategories } from "../stores/stores";

    import { get } from "svelte/store";

    export let options;
    export let category;
    export let id;
    export let dropdownClass;
    export let disabledBoolean;

    // cast incoming string to boolean
    let disableDropdown = disabledBoolean == "true";
    let resetId = `reset-${category}`;

    let currentSelection;
    const handleChange = () => {
        console.log(id);
        // when a 'group' was selected reset all other selections;
        // enable 'dropdownService' (it's disabled before a 'group' was selected)
        // disable 'dropdownType' (since all was reset and therefor no 'service' is selected anymore either)
        if (currentSelection.category === "group") {
            selectedCategories.update((obj) => {
                obj["service"] = null;
                obj["type"] = null;
                return obj;
            });
            // change the dropdown's values back to "Bitte auswaehlen"
            document.getElementById("reset-service").selected = "true";
            document.getElementById("reset-type").selected = "true";
            // enable 'dropdownService'
            let dropdownService = document.getElementById("dropdown-service");
            dropdownService.disabled = false;
            // disable 'dropdownType'
            let dropdownType = document.getElementById("dropdown-type");
            dropdownType.disabled = true;
        }

        // when a 'service' was picked reset the selected 'type' and
        // enable 'dropdown-type' (it's disabled before a 'service' was picked for the first time)
        if (currentSelection.category === "service") {
            selectedCategories.update((obj) => {
                obj["type"] = null;
                return obj;
            });
            document.getElementById("reset-type").selected = "true";
            let dropdownType = document.getElementById("dropdown-type");
            // enable 'dropdownType'
            dropdownType.disabled = false;
        }
        // update the global 'selectedCategories' object
        selectedCategories.update((obj) => {
            obj[currentSelection.category] = currentSelection.opt;
            return obj;
        });
        console.log(get(selectedCategories));
    };
</script>

<div class="select-wrapper">
    <!-- svelte-ignore a11y-no-onchange -->
    <select
        bind:value={currentSelection}
        on:change={handleChange}
        id={id}
        class={dropdownClass}
        disabled={disableDropdown}>
        <option selected disabled hidden id={resetId}>Bitte auswählen</option>
        {#each options as opt}
            <option value={{ opt, category }}>{opt}</option>
        {/each}
    </select>
</div>

<style>
    .select-wrapper {
        position: relative;
        width: 300px;
        display: inline-block;
    }

    .select-wrapper::after {
        content: url("../../../static/images/icon_dropdown_closed.svg");
        pointer-events: none;
        position: absolute;
        height: calc(100% - 12px);
        padding-top: 12px;
        padding-left: 20px;
        right: 15px;
        /* border: 1px solid red; */
        border-left: 1px solid grey;
        width: 20px;
    }

    .select-wrapper:hover::after {
        content: url("../../../static/images/icon_dropdown_open.svg");
        transition: 0.3s;
    }

    select {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        border: 1px solid #595959;
        border-radius: 24px;
        color: grey;
        cursor: pointer;
        font-family: "Open Sans", sans-serif;
        font-size: 16px;
        height: 40px;
        outline: none;
        padding-left: 10px;
        width: 100%;
        background-color: white;
    }

    option {
        color: darkgrey;
        background-color: white;
        margin-top: 10px;
    }

    select::-ms-expand {
        display: none;
    }

    select:focus::-ms-value {
        background-color: red;
    }
</style>
