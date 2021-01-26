<script>
    import {
        price,
        quantity,
        calculatedPrice,
        priceDisableStatus,
    } from "../stores/stores.js";
    import { get } from "svelte/store";

    let disabled;
    priceDisableStatus.subscribe((status) => {
        // console.log(status);
        disabled = status;
    });

    let literalPrice = "0.00";
    calculatedPrice.subscribe((price) => {
        literalPrice = price;
    });
</script>

<!-- MARKUP ------------------------------ -->
<div class="wrapper-price">
    <p id="price" class:inactive={disabled} disabled={disabled}>
        {`${literalPrice} €`}
    </p>
</div>

<!-- STYLING ------------------------------ -->
<style>
    .wrapper-price {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    p {
        font-size: 48px;
        font-weight: 700;
        margin: 0;
        padding: 0;
        font-family: Montserrat;
        display: block;
        /* text-decoration-line: underline;
        text-decoration-style: double; */
        /* border: 1px solid red; */
    }

    p.inactive {
        color: lightgray;
    }
</style>
