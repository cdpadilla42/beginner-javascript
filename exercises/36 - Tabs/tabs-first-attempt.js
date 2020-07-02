function tabs(tablist) {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function switchTabContent(id) {
    const prevOpenTab = tabPanels.find((tab) => !tab.hidden);
    const newOpenTab = tabPanels.find(
      (tab) => tab.getAttribute('aria-labelledby') === id
    );
    prevOpenTab.hidden = true;
    newOpenTab.hidden = false;
  }

  function handleTabClick(e) {
    // switch active tab and remove previously active tag
    const prevTag = tabs.find((tab) => tab.matches('[aria-selected="true"]'));
    if (prevTag === e.currentTarget) return;

    prevTag.setAttribute('aria-selected', 'false');
    e.currentTarget.setAttribute('aria-selected', 'true');

    // switch visible tag content
    switchTabContent(e.currentTarget.id);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', handleTabClick);
  });
}

tabs(document.querySelector('[role="tablist"]'));
