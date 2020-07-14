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

  textOptionInputs.forEach((input) =>
    input.addEventListener('input', (e) => {
      generateText(e.currentTarget);
    })
  );

  // generate text for currently selected option
  generateText(textOptionInputs.find((input) => input.checked));
}

textGenerator(document.querySelector('.typer'));
