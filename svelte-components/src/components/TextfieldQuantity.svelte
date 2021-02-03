<script>
    import {
        priceDisableStatus,
        calculatedPrice,
        price,
        quantity,
    } from "../stores/stores.js";

    // to be a boolean that reflects the current state
    // of the component
    let disabled;
    priceDisableStatus.subscribe((status) => {
        disabled = status;
    });

    let quantityTEMP;
    quantity.subscribe((qty) => {
        quantityTEMP = qty;
    });

    let priceTEMP;
    price.subscribe((p) => {
        priceTEMP = p;
    });

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if (new Date().getTime() - start > milliseconds) {
                break;
            }
        }
    }

    const increase = (e) => {
        quantityTEMP = quantityTEMP + 1;
        calculatePrice();
    };

    const decrease = () => {
        quantityTEMP = quantityTEMP - 1;
        quantityTEMP < 1 ? (quantityTEMP = 1) : (quantityTEMP = quantityTEMP);
        calculatePrice();
    };

    const calculatePrice = (event) => {
        let calculatedPriceTEMP = (quantityTEMP * priceTEMP).toFixed(2);
        if (calculatedPriceTEMP == "NaN") {
            calculatedPriceTEMP = "0.00";
        }
        quantity.set(quantityTEMP);
        calculatedPrice.set(calculatedPriceTEMP);
    };
</script>

<!-- MARKUP ------------------------------ -->
<div class="wrapper-quantity">
    <label for="quantity">Umfang</label>
    <div class="lower-row">
        <input
            name="quantity"
            disabled={disabled}
            class:inactive={disabled}
            type="number"
            min="1"
            bind:value={quantityTEMP}
            on:input|preventDefault={calculatePrice} />
        <div class="arrows">
            <button
                alt="up"
                class="up"
                disabled={disabled}
                class:inactive={disabled}
                on:click={increase} />
            <button
                alt="down"
                class="down"
                disabled={disabled}
                class:inactive={disabled}
                on:click={decrease} />
        </div>
        <!-- depending on 'quantity', either show 'Seite' or 'Seiten' -->
        <span
            class:inactive={disabled}>{quantityTEMP > 1 ? 'Seiten' : 'Seite'}</span>
    </div>
</div>

<!-- STYLING ------------------------------ -->
<style>
    .wrapper-quantity {
        display: grid;
        grid-template-rows: auto auto;
        width: 280px;
        margin-top: 16px;
        align-items: center;
    }
    .lower-row {
        grid-row: 2;
        display: flex;
        align-items: center;
    }
    /* number input field's label */
    label {
        display: block;
        padding-left: 15px;
        color: #c4c4c4;
        margin-bottom: 5px;
    }
    /* number input field */
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

    input.inactive {
        border: 1px solid lightgray;
        color: lightgray;
        cursor: default;
    }

    span {
        margin-left: 8px;
    }
    /* corresponding span in markup either shows "Seite" or "Seiten" */
    span.inactive {
        color: lightgray;
    }

    .arrows {
        display: flex;
        flex-direction: column;
        margin-left: 8px;
    }

    .arrows .up {
        background-image: url("../../../static/images/icon_qty_up.svg");
        background-repeat: no-repeat;
        background-size: contain;
        margin-bottom: 2px;
        width: 16px;
        height: 14px;
        background-color: white;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }

    .arrows .up:hover {
        background-image: url("../../../static/images/icon_qty_up_hover.svg");
    }

    .arrows .down {
        background-image: url("../../../static/images/icon_qty_down.svg");
        background-size: contain;
        background-repeat: no-repeat;
        width: 16px;
        height: 18px;
        background-color: white;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }

    .arrows .down:hover {
        background-image: url("../../../static/images/icon_qty_down_hover.svg");
    }

    .arrows .down.inactive {
        background-image: url("../../../static/images/icon_qty_down_inactive.svg");
        cursor: default;
    }

    .arrows .up.inactive {
        background-image: url("../../../static/images/icon_qty_up_inactive.svg");
        cursor: default;
    }

    /* disable spinners */
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
