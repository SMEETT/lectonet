<script>
    import { price, quantity, calculatedPrice } from "../stores/stores.js";
    import { get } from "svelte/store";

    const calculatePrice = () => {
        console.log(get(price));
        console.log(get(quantity));

        const priceTEMP = parseFloat(get(price));
        const quantityTEMP = parseFloat(get(quantity));

        let calcPrice = quantityTEMP * priceTEMP;
        let finalPrice = calcPrice.toFixed(2);
        console.log(finalPrice);

        calculatedPrice.set(finalPrice);
    };
</script>

<!-- MARKUP ------------------------------ -->
<button on:click|preventDefault={calculatePrice} class="btn outline">Preis
    berechnen</button>

<!-- STYLING ------------------------------ -->
<style>
    button {
        text-transform: none;
        border-radius: 10px;
        font-weight: 500;
        font-size: 16px;
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
</style>
