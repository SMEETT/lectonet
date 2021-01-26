<script>
</script>

<form class="email" on:submit|preventDefault>
    <div class="email-form-desc">
        Sit dui diam, suspendisse in nunc. Leo lacus, eget pretium consectetur.
    </div>
    <div class="email-form-name">
        <input type="text" name="lastname" class="name" placeholder="Name" />
        <input
            type="text"
            name="firstname"
            class="name"
            placeholder="Vorname" />
    </div>
    <div class="email-form-address">
        <input
            class="email"
            type="text"
            name="email"
            placeholder="E-Mail Adresse" />
    </div>
    <div class="email-form-checkboxes">
        <input type="checkbox" class="checkbox" name="checkbox" />
        <label for="checkbox">Mit Datenschutzerklärung einverstanden</label>
    </div>
    <div class="email-form-button">
        <button class="btn outline">Abschicken</button>
    </div>
</form>

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
    form.email {
        display: grid;
        /* column-gap: 20px; */
        /* row-gap: 16px; */
        /* grid-auto-flow: column; */
        justify-items: center;
        align-items: center;
        width: 100%;

        /* border: 1px solid red; */
        padding: 0 50px 10px 50px;
        grid-template-columns: 100%;
        grid-template-rows: auto auto auto auto auto;
    }

    .email-form-desc {
        margin-top: 16px;
        grid-row: 1;
        text-align: center;
        padding: 0 80px;
    }

    .email-form-name {
        grid-row: 2;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    input {
        width: 100%;
        padding-left: 15px;
        height: 40px;
        font-size: 16px;
        border: 1px solid #595959;
        box-sizing: border-box;
        border-radius: 24px;
    }

    input.name {
        width: 49%;
        margin-top: 16px;
    }

    input.checkbox {
        height: auto;
        width: 5%;
    }

    label {
        width: auto;
    }

    .email-form-address {
        grid-row: 3;
        width: 100%;
        margin-top: 16px;
    }

    .email-form-checkboxes {
        grid-row: 4;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
    }

    .email-form-button {
        grid-row: 5;
        margin-top: 16px;
    }

    button {
        text-transform: none;
        border-radius: 10px;
        font-weight: 500;
        font-size: 16px;
        padding: 0 16px;
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

    /* ----------- 1280-WIDTH */
    @media (min-width: 1280px) {
    }
    /* ----------- 960-WIDTH */
    @media (max-width: 1279px) {
    }
    /* ----------- 600-WIDTH */
    @media (max-width: 959px) {
        form.email {
            padding: 0 20px 10px 20px;
        }
    }
    /* ----------- 320-WIDTH */
    @media (max-width: 599px) {
        .email-form-desc {
            padding: 0;
        }
        form.email {
            padding: 0 10px 10px 10px;
        }
        .email-form-name {
            grid-row: 2;
            width: 100%;
            display: flex;
            flex-direction: column;
        }
        input.name {
            width: 100%;
        }
        input.checkbox {
            width: 10%;
        }
        label {
            margin-left: 8px;
        }
    }
</style>
