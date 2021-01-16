<script>
    import { get } from "svelte/store";
    import { quantity } from "../stores/stores.js";

    let quantityTEMP = 1;

    const updateQuantity = () => {
        quantity.set(quantityTEMP);
        console.log(get(quantity));
    };
</script>

<!-- MARKUP ------------------------------ -->
<label for="quantity">Umfang</label>
<input
    name="quantity"
    type="number"
    min="1"
    bind:value={quantityTEMP}
    on:change={updateQuantity} />

<span>{quantityTEMP > 1 ? 'Seiten' : 'Seite'}</span>

<!-- STYLING ------------------------------ -->
<style>
    label {
        display: block;
        padding-left: 15px;
        color: #c4c4c4;
        margin-bottom: 5px;
    }
    input {
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        border: 1px solid #595959;
        border-radius: 24px;
        color: #595959;
        font-weight: 500;
        cursor: pointer;
        font-family: "Open Sans", sans-serif;
        font-size: 16px;
        text-align: center;
        height: 40px;
        outline: none;
        width: 80px;
        background-color: white;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>
