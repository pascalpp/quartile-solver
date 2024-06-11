<script lang="ts">
  import QuartileInput from '$lib/QuartileInput.svelte';
  import { findWords } from '$lib/find-words';
  import { localStore } from '$lib/localStore.svelte.ts';
  import { onMount } from 'svelte';

  const emtpyTokens: string[] = new Array(20).fill('');

  type TokenSets = Record<string, string[]>;

  const date = new Date();
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const yyyymmdd = `${year}-${month}-${day}`;

  let currentDate = $state(yyyymmdd);
  let sets = localStore<TokenSets>('quartile', { [yyyymmdd]: emtpyTokens });
  let words = $derived(findWords(sets.value[currentDate]));

  function pad(n: number) {
    return n.toString().padStart(2, '0');
  }

  function save(set: string[] = emtpyTokens) {
    sets.value[currentDate] = set;
  }
</script>

<svelte:head>
  <title>Quartile Solver</title>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui;
      font-size: 16px;
      line-height: 1.5;
      background-color: hsl(120, 50%, 80%);
    }
  </style>
</svelte:head>

<main>
  <h1>Quartile Solver</h1>

  <!-- <datalist id="names">
    {#each names as name}
      <option value={name}>{name}</option>
    {/each}
  </datalist> -->

  <QuartileInput bind:name={currentDate} bind:tokens={sets.value[currentDate]} {save} />

  {#if words && words.length > 0}
    <h2>Words: {words.length}</h2>
    <div class="words">
      {#each words as word}
        <div>{word}</div>
      {/each}
    </div>
  {/if}
</main>

<style>
  main {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  h1 {
    margin: 0;
  }

  h2 {
    margin: 0;
  }

  .words {
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    max-width: 600px;
  }
</style>
