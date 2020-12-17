<script>
    export let name;
</script>

<main>
    <dialog class="preisrechner-wrapper">

    
        <h1>Hello {name}!</h1>
        <p></p>

        <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    </dialog>
</main>

<style>
    .preisrechner-wrapper {
        	
        margin: 0;
        transition: 0s;
        padding: 0;
        width: 700px;
        height: 860px;
        background-color: gray;
        position: fixed;
        top: 50%;
        left: 50%;
        border: 3px solid red;
        margin-left: -14px;
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
    }
}
/* ----------- 320-WIDTH */
@media (max-width: 599px) {
        .preisrechner-wrapper {
        width: 300px;
        height: 1068px;
    }
}


</style>


<!-- <style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style> -->