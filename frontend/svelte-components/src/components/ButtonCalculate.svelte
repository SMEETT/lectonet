<script>
    import {
        price,
        quantity,
        calculatedPrice,
        disableCalcButton,
    } from "../stores/stores.js";
    import { get } from "svelte/store";

    let disabled;
    disableCalcButton.subscribe((status) => {
        console.log(status);
        disabled = status;
    });

    let calculatedPriceOutput;
    calculatedPrice.subscribe((price) => {
        calculatedPriceOutput = price;
    });

    const calculatePrice = () => {
        console.log(get(price));
        console.log(get(quantity));

        const priceTEMP = parseFloat(get(price));
        const quantityTEMP = parseFloat(get(quantity));

        let finalPrice = (quantityTEMP * priceTEMP).toFixed(2);
        console.log(finalPrice);
        calculatedPrice.set(finalPrice);
    };
</script>

<!-- MARKUP ------------------------------ -->
<button
    disabled={disabled}
    on:click|preventDefault={calculatePrice}
    class="btn outline"
    class:inactive={disabled}>
    Preis berechnen
</button>
<p id="price" class:inactive={disabled}>{calculatedPriceOutput} €</p>

<!-- STYLING ------------------------------ -->
<style>
    button {
        text-transform: none;
        border-radius: 10px;
        font-weight: 500;
        font-size: 16px;
    }

    p {
        font-size: 32px;
        font-weight: 700;
        margin: 0;
        padding: 0;
        font-family: Montserrat;
        display: block;
        /* border: 1px solid red; */
    }

    p.inactive {
        color: lightgray;
    }

    .btn {
        display: flex;
    }

    .btn.outline {
        border: 1px solid var(--default-grey);
        background: transparent;
        color: var(--default-grey);
    }

    .btn.outline:hover {
        background: var(--default-grey);
        color: white;
    }

    .btn.inactive {
        border: 1px solid lightgray;
        color: lightgray;
        cursor: default;
    }

    .btn.inactive:hover {
        color: lightgray;
        background: transparent;
    }
</style>
