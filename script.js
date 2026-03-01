// ==UserScript==
// @name         typedecker's Aternos Cross Utility Plugin
// @namespace    aternos_cross_utility
// @version      1.2
// @description  Handles adblock overlay with an instant click on detection to reduce latency times; Also instantly clicks the confirm now! button when in a queue.
// @match        https://aternos.org/*
// @grant        none
// ==/UserScript==

let lastState = '';
let lastOverlayState = '';

function checkAndClick() {
    const adblockOverlaySpan = document.getElementById('KqBykqiuSkox');
    if (!adblockOverlaySpan) return;

    const currentOverlayState = adblockOverlaySpan.style.display;

    if (currentOverlayState !== lastOverlayState) {
        console.log('Adblock Overlay State Changed:', currentOverlayState);
        lastOverlayState = currentOverlayState;
    }

    if (adblockOverlaySpan.style.opacity === '1' && adblockOverlaySpan.style.display !== 'none') {
        const continueWithAdblockerButton = document.querySelector('.GCQODuhMssFE');
        if (!continueWithAdblockerButton) return;

        console.log('Clicking Adblock Allowance button...')
        continueWithAdblockerButton.click();
    }

    const serverActions = document.querySelector('.server-actions');
    if (!serverActions) return;

    const currentState = serverActions.className;

    if (currentState !== lastState) {
        console.log('State changed:', currentState);
        lastState = currentState;
    }

    if (
        serverActions.classList.contains('queueing') &&
        serverActions.classList.contains('pending')
    ) {
        const confirmButton = document.getElementById('confirm');

        if (
            confirmButton &&
            confirmButton.offsetParent !== null &&
            !confirmButton.disabled
        ) {
            console.log('Confirm detected — clicking.');
            confirmButton.click();
        }
    }
}

// Observe entire document for changes (SPA-safe)
const observer = new MutationObserver(() => {
    checkAndClick();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
});

// Run once immediately
checkAndClick();

console.log('Aternos Auto Confirm loaded.');