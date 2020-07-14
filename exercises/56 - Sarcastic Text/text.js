function textGenerator(typer) {
  const textOptionInputs = Array.from(
    typer.querySelectorAll('[name="filter"]')
  );

  function generateText(input) {
    switch (input.value) {
      case 'sarcastic':
        console.log('SaRcAsTiC');
        break;
      case 'funky':
        console.log('funkyyyyyy');
        break;
      case 'unable':
        console.log('.....');
        break;
      default:
        console.log('none selected');
        break;
    }
  }

  function makeSarcastic() {
    const input = typer.querySelector('[name="text"]').value;
    const sarcastic = input
      .split('')
      .map((letter, i) => {
        if (i % 2) return letter.toUpperCase();
        return letter;
      })
      .join('');
    return sarcastic;
  }

  textOptionInputs.forEach((input) =>
    input.addEventListener('input', (e) => {
      generateText(e.currentTarget);
    })
  );

  // generate text for currently selected option
  generateText(textOptionInputs.find((input) => input.checked));
  makeSarcastic();
}

textGenerator(document.querySelector('.typer'));
