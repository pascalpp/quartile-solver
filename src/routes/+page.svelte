<script lang="ts">
  import QuartileInput from '$lib/QuartileInput.svelte';
  import { findWords } from '$lib/find-words';
  import { localStore } from '$lib/localStore.svelte.ts';
  import { onMount } from 'svelte';

  const initialState: string[] = new Array(20).fill('');

  const date = new Date();
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const yyyymmdd = `${year}-${month}-${day}`;

  let name = localStore('current-name', yyyymmdd);
  let tokens = $derived(localStore(name.value, initialState));
  let words = $derived(findWords(tokens.value));

  function pad(n: number) {
    return n.toString().padStart(2, '0');
  }

  function onBlurName(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    name.value = input.value;
  }

  let names: string[] = $state([]);

  onMount(() => {
    names = Object.keys(localStorage)
      .filter(key => key.match(/^\d{4}-\d{2}-\d{2}$/))
      .sort();
  });
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

  <input list="names" type="text" value={name.value} onblur={onBlurName} />
  <datalist id="names">
    {#each names as name}
      <option value={name}>{name}</option>
    {/each}
  </datalist>

  <QuartileInput bind:tokens={tokens.value} />

  {#if words.length > 0}
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

  input {
    padding: 0.333em;
    background-color: white;
    color: black;
    text-align: center;
    border: 2px solid rgb(133, 133, 210);
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
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
