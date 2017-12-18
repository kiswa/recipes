<template>
  <section class="card">
    <header>
      {{ title }}
      <span>{{ type }}</span>
    </header>
    <img :src="imgSrc">
    <div class="description">{{ description }}</div>
    <div class="times">
      <div class="center">Total Recipe Time: {{ recipeTime }}</div>
      <div>
        Prep Time: {{ prepTime }}
        <span>Cook Time: {{ cookTime }}</span>
        </div>
    </div>
  </section>
</template>
