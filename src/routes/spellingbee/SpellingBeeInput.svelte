<script lang="ts">
  interface SpellingBeeInputProps {
    letters: string;
  }

  let { letters = $bindable() }: SpellingBeeInputProps = $props();

  const slots = new Array(7).fill('').map((_, i) => letters[i]?.toUpperCase() ?? '');

  function handleInput(input: HTMLInputElement, index: number) {
    const onInput = () => {
      input.value = input.value.replace(/[^a-z]/g, '').toUpperCase();
      letters = [...letters.slice(0, index), input.value, ...letters.slice(index + 1)].join('');
    };
    const onBlur = () => {
      letters = [...letters.slice(0, index), input.value, ...letters.slice(index + 1)].join('');
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
  {#each slots as letter, index}
    <div class="token">
      <!-- svelte-ignore a11y_autofocus -->
      <input
        type="text"
        maxlength="1"
        value={letter}
        use:handleInput={index}
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        autofocus={!letter}
      />
    </div>
  {/each}
</div>

<style>
  .tokens {
    --gridsize: 200px;
    --center: calc(var(--gridsize) / 2);
    --size: 70px;
    --margin: 6px;
    --x-offset: calc(var(--size) * 5 / 6 + var(--margin));
    --y-offset: calc(var(--size) + var(--margin));
    position: relative;
    width: var(--gridsize);
    height: var(--gridsize);
    margin-top: 2rem;
  }

  .token {
    --bgcolor: #f0f0f0;
    box-sizing: border-box;
    background-color: var(--bgcolor);
    position: absolute;
    height: var(--size);
    width: calc(var(--size) / 2);
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);

    input {
      padding: 0;
      box-sizing: border-box;
      background-color: transparent;
      border: none;
      color: black;
      text-align: center;
      font-weight: bold;
      font-size: calc(var(--size) / 2.6);
      outline: none;
      width: 100%;
    }

    &::before {
      display: block;
      content: '';
      border-right: calc(var(--size) / 3) solid var(--bgcolor);
      border-top: calc(var(--size) / 2) solid transparent;
      border-bottom: calc(var(--size) / 2) solid transparent;
      position: absolute;
      right: 100%;
    }
    &::after {
      display: block;
      content: '';
      border-left: calc(var(--size) / 3) solid var(--bgcolor);
      border-top: calc(var(--size) / 2) solid transparent;
      border-bottom: calc(var(--size) / 2) solid transparent;
      position: absolute;
      left: 100%;
    }
  }

  .token:nth-child(1) {
    --bgcolor: #f3db53;
    left: var(--center);
    top: var(--center);
  }
  .token:nth-child(2) {
    left: var(--center);
    top: calc(var(--center) - var(--y-offset));
  }
  .token:nth-child(3) {
    left: calc(var(--center) + var(--x-offset));
    top: calc(var(--center) - var(--y-offset) / 2);
  }
  .token:nth-child(4) {
    left: calc(var(--center) + var(--x-offset));
    top: calc(var(--center) + var(--y-offset) / 2);
  }
  .token:nth-child(5) {
    left: var(--center);
    top: calc(var(--center) + var(--y-offset));
  }
  .token:nth-child(6) {
    left: calc(var(--center) - var(--x-offset));
    top: calc(var(--center) + var(--y-offset) / 2);
  }
  .token:nth-child(7) {
    left: calc(var(--center) - var(--x-offset));
    top: calc(var(--center) - var(--y-offset) / 2);
  }
</style>
