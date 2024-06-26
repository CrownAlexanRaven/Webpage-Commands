// ==UserScript==
// @name         Webpage Commands
// @namespace    WEBPAGES_COMMANDS
// @version      0.5.0
// @description  Basic commands exectuable through the
// @author       Crown Alexandria Raven
// @match        *://*/*
// @icon         https://avatars.githubusercontent.com/u/117503464?v=4
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    let commandsEnabled = false;
    let originalStyles = [];

    window.cssdisable = function() {
        if (commandsEnabled) {
            const confirmation = confirm('Webpage Commands: Are you sure you want to disable CSS?');

            if (confirmation) {
                console.log('Webpage Commands: Disabling CSS.');
                originalStyles = [];

                document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
                    originalStyles.push({
                        element: link,
                        styles: link.outerHTML
                    });
                    link.disabled = true;
                });

                document.querySelectorAll('style').forEach((style) => {
                    originalStyles.push({
                        element: style,
                        styles: style.textContent
                    });
                    style.textContent = '';
                });

                document.querySelectorAll('*').forEach((element) => {
                    const inlineStyles = element.getAttribute('style');
                    if (inlineStyles) {
                        originalStyles.push({
                            element,
                            styles: inlineStyles
                        });
                        element.removeAttribute('style');
                    }
                });
            } else {
                console.log('Webpage Commands: CSS disabling canceled.');
            }
        } else {
            console.log('Webpage Commands: Commands are not enabled. Type command1() to enable commands.');
        }
    };

    window.cssenable = function() {
        if (commandsEnabled) {
            console.log('Webpage Commands: Enabling CSS.');
            originalStyles.forEach(({ element, styles }) => {
                if (element.tagName === 'STYLE') {
                    element.textContent = styles;
                } else if (element.tagName === 'LINK') {
                    element.disabled = false;
                } else {
                    element.setAttribute('style', styles);
                }
            });
            originalStyles = []; // Clear stored styles after enabling them
        } else {
            console.log('Webpage Commands: Commands are not enabled. Type command1() to enable commands.');
        }
    };

    window.comhelp = function() {
        if (commandsEnabled) {
            console.log(`Webpage Commands: Displaying Usable commands
command1() Activates or Deactivates the Command1 set
cssdisable() deactivates CSS on webpage
cssenable() reactivates CSS on webpage`);
        } else {
            console.log('Webpage Commands: Commands are not enabled. Type command1() to enable commands.');
        }
    };

    window.command1 = function() {
        commandsEnabled = !commandsEnabled;
        console.log(`Webpage Commands: The Commands1 set has been ${commandsEnabled ? 'activated' : 'deactivated'}.`);
    };

    console.log('Webpage Commands: Run command1() to enable UserScript Commands.');
})();