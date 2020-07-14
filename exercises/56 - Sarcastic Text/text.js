function textGenerator(typer) {
  const textOptionInputs = Array.from(
    typer.querySelectorAll('[name="filter"]')
  );
  const input = typer.querySelector('[name="text"]');
  const resultElm = document.querySelector('.result');

  function generateText(input) {
    let filteredText;
    switch (input.value) {
      case 'sarcastic':
        filteredText = makeSarcastic();
        break;
      case 'funky':
        filteredText = makeFunky();
        break;
      case 'unable':
        filteredText = makeUnable();
        break;
      default:
        console.log('none selected');
        break;
    }
    renderToPage(filteredText);
  }

  function makeSarcastic() {
    // TODO refactor so this isn't repeated
    const message = input.value;
    const sarcastic = message
      .split('')
      .map((letter, i) => {
        if (i % 2) return letter.toUpperCase();
        return letter;
      })
      .join('');
    return sarcastic;
  }

  function makeUnable() {
    const message = input.value;
    const unable = message
      .split(' ')
      .map((word, i) => {
        if (i % 2) return word + '...';
        return word + ' ';
      })
      .join('');
    return unable;
  }

  function makeFunky() {
    return 'SPOOOOOOOKY';
  }

  function renderToPage(text) {
    resultElm.textContent = text;
  }

  function handleTextChange() {
    generateText(textOptionInputs.find((input) => input.checked));
  }

  textOptionInputs.forEach((input) =>
    input.addEventListener('input', (e) => {
      generateText(e.currentTarget);
    })
  );

  input.addEventListener('input', handleTextChange);

  // generate text for currently selected option
  handleTextChange();
}

textGenerator(document.querySelector('.typer'));
