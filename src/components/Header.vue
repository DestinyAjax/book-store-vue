<template>
<div class="container">
  <header class="page-header">
    <div class="branding">
      <img src="https://vuejs.org/images/logo.png" alt="Logo" title="Home page" class="logo"/>
      <h1>{{ msg }}</h1>
    </div>
  </header>
  <main id="app"></main>
</div>
</template>

<script>
export default {
	name: "Header",
	data() {
		return {
			msg: "Exquis Book Store Application",
		};
	},
};
</script>