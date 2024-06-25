<script lang="ts">
  import QuartileInput from '$lib/QuartileInput.svelte';
  import { Dictionary } from '$lib/Dictionary';
  import { localStore } from '$lib/localStore.svelte.ts';
  import americanEnglishDictionary from '$lib/american-english.txt?raw';
  import collinsDictionary from '$lib/collins.txt?raw';
  import sowpodsDictionary from '$lib/sowpods.txt?raw';
  import twlDictionary from '$lib/twl.txt?raw';

  const collins = new Dictionary(collinsDictionary);
  const american = new Dictionary(americanEnglishDictionary);
  const sowpods = new Dictionary(sowpodsDictionary);
  const twl = new Dictionary(twlDictionary);
  const allWords = [americanEnglishDictionary, collinsDictionary, sowpodsDictionary, twlDictionary]
    .map(dict => dict.trim())
    .join('\n');
  const all = new Dictionary(allWords);

  const emtpyTokens: string[] = new Array(20).fill('');

  type TokenSets = Record<string, string[]>;

  const date = new Date();
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const yyyymmdd = `${year}-${month}-${day}`;

  let dictionary = $state(american);
  let currentDate = $state(yyyymmdd);
  let sets = localStore<TokenSets>('quartile', { [yyyymmdd]: emtpyTokens });
  let words = $derived(dictionary.findWords(sets.value[currentDate]));

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
    <details>
      <summary>Words: {words.length}</summary>
      <div class="words">
        {#each words as word}
          <div>{word}</div>
        {/each}
      </div>
    </details>
  {/if}

  <div class="button-bar">
    <button onclick={() => (dictionary = collins)} disabled={dictionary === collins}>
      Collins
    </button>
    <button onclick={() => (dictionary = sowpods)} disabled={dictionary === sowpods}>
      SowPods
    </button>
    <button onclick={() => (dictionary = twl)} disabled={dictionary === twl}> TWL </button>
    <button onclick={() => (dictionary = all)} disabled={dictionary === all}> All </button>
  </div>
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

  summary {
    font-weight: bold;
    margin: 0;
    font-size: 22px;
    margin-bottom: 0.5em;
  }

  .words {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    max-width: 600px;
  }

  button {
    font: inherit;
    border: 1px solid rgb(0 0 0 / 0.5);
    border-radius: 5px;
    background-color: #eee;
    padding: 0.333em 1em;
    height: auto;
    font-weight: bold;

    &[disabled] {
      background-color: #333;
      color: white;
    }
  }

  .button-bar {
    display: flex;
    flex-direction: row;
    gap: 0px;

    button {
      border-radius: 0px;
      min-width: 4em;
      &:first-child {
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
        padding-left: 1.25em;
      }
      &:last-child {
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        padding-right: 1.25em;
      }

      & + button {
        border-left: 0px;
      }
    }
  }
</style>
