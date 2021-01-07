<script>
    export let options;
    export let category;

    let currentSelection;

    const handleChange = () => {
        console.log("dropdown: handle change");
    };
</script>

<div class="select-wrapper">
    <!-- svelte-ignore a11y-no-onchange -->
    <select bind:value={currentSelection} on:change={handleChange}>
        {#each options as opt}
            <option value={opt}>{opt}</option>
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
