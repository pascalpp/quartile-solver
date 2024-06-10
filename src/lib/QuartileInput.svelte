<script lang="ts">
  interface QuartileInputProps {
    tokens: string[];
  }

  let { tokens = $bindable() }: QuartileInputProps = $props();

  function handleInput(input: HTMLInputElement, index: number) {
    const onInput = (event: Event) => {
      input.value = input.value.replace(/[^a-z]/g, '').toLowerCase();
      tokens = [...tokens.slice(0, index), input.value, ...tokens.slice(index + 1)];
    };
    const onBlur = () => {
      tokens = [...tokens.slice(0, index), input.value, ...tokens.slice(index + 1)];
    };

    input.addEventListener('input', onInput);
    input.addEventListener('blur', onBlur);
    return {
      destroy() {
        input.removeEventListener('input', onInput);
        input.removeEventListener('blur', onBlur);
      }
    };
  }
</script>

<div class="tokens">
  {#each tokens as token, index}
    <input
      type="text"
      maxlength="4"
      class="token"
      value={token}
      use:handleInput={index}
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
    />
  {/each}
</div>

<style>
  .tokens {
    display: grid;
    grid-template-columns: repeat(4, 64px);
    gap: 1em;
  }

  .token {
    box-sizing: border-box;
    padding: 0.5em 0.2em;
    background-color: white;
    color: black;
    text-align: center;
    border: 2px solid rgb(133, 133, 210);
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
  }
</style>
