const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');

function handleTabClick(e) {
  // hide all other tab panels
  tabPanels.forEach((tabPanel) => {
    return (tabPanel.hidden = true);
  });
  // mark all tabs as unselected
  tabButtons.forEach((tab) => tab.setAttribute('aria-selected', false));
  // mark the clicked tab as selected
  e.currentTarget.setAttribute('aria-selected', true);
  // find the associated tabPanel and show it
  const { id } = e.currentTarget;
  // const openingTab = tabPanels.find(
  //   (panel) => panel.getAttribute('aria-labelledby') === id
  // );

  const openingTab = tabs.querySelector(`[aria-labelledby="${id}"]`);
  openingTab.hidden = false;
}

tabButtons.forEach((button) =>
  button.addEventListener('click', handleTabClick)
);
