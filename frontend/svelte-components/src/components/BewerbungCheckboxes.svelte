<script>
    import {
        services,
        groups,
        types,
        selectedCategories,
    } from "../stores/stores.js";

    let dropdownDataTypes;

    types.subscribe((data) => {
        dropdownDataTypes = data;
        console.log(dropdownDataTypes);
    });
</script>

<!-- MARKUP ------------------------------ -->
<div class="checkboxes-wrapper">
    {#each dropdownDataTypes as checkbox}
        <div class="checkbox-wrapper">
            <input type="checkbox" name={`${checkbox}-name`} />
            <span>{checkbox}</span>
            <!-- <label for={`${checkbox}-name`}>{checkbox}</label> -->
        </div>
    {/each}
</div>

<!-- STYLING ------------------------------ -->
<style>
    span {
        margin-left: 8px;
    }
    .checkbox-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    input {
    }
    .checkboxes-wrapper {
        display: flex;
        flex-direction: column;
    }
    label {
        display: block;
    }
</style>
