'use strict';


import * as vscode from 'vscode';
import * as request from "request-promise-native";

const opn = require('opn');

export function activate(context: vscode.ExtensionContext) {

    const searchBySelection = vscode.commands.registerCommand('extension.stackoverflow-search-selection', async () => {
        //const ex = getExceptionDetails();
        const searchTerm = getSelectedText();
        await executeSearch(searchTerm);
    });

    const searchWithPrompt = vscode.commands.registerCommand('extension.stackoverflow-search', async () => {
        const selectedText = getSelectedText();
        const searchTerm = await vscode.window.showInputBox({
            ignoreFocusOut: selectedText === '',
            placeHolder: 'Enter your Stackoverflow search query',
            // prompt: 'search for tooltip',
            value: selectedText,
            valueSelection: [0, selectedText.length + 1],
        });

        await executeSearch(searchTerm!);
    });

    context.subscriptions.push(searchBySelection);
    context.subscriptions.push(searchWithPrompt);
}

export function deactivate() {
}

async function executeSearch(searchTerm: string): Promise<void> {
    if (!searchTerm || searchTerm.trim() === '') {
        return;
    }

    searchTerm = searchTerm.trim();
    console.log(`User initiated a stackoverflow search with [${searchTerm}] search term`);
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const stackoverflowApiKey = '<your_stackoverflow_api_key>';
    const apiSearchUrl = `https://api.stackexchange.com/2.2/search?order=desc&sort=relevance&intitle=${encodedSearchTerm}&site=stackoverflow&key=${stackoverflowApiKey}`;
    const stackoverflowSearchUrl = `https://stackoverflow.com/search?q=${encodedSearchTerm}`;
    const googleSearchUrl = `https://www.google.com/search?q=${encodedSearchTerm}`;
    const uriOptions = {
        uri: apiSearchUrl,
        json: true,
        gzip: true,
    };
    const questionsMeta = [
        { title: `🌐 🔎 Search Stackoverflow: ${searchTerm}`, url: stackoverflowSearchUrl },
        { title: `🕸️ 🔎 Search Google: ${searchTerm}`, url: googleSearchUrl },
    ];
    try {
        const searchResponse = await request.get(uriOptions);
        if (searchResponse.items && searchResponse.items.length > 0) {


            searchResponse.items.forEach((q: any, i: any) => {
                questionsMeta.push({
                    title: `${i}: ${q.is_answered ? '✅' : '🤔'} ${q.score}🔺 ${q.answer_count}❗ ➡️ ${decodeURIComponent(q.title)} 🏷️ ${q.tags.join(',')} 👩‍💻 by ${q.owner.display_name}`,
                    url: q.link
                });
            });
        }
    } catch (error) {
        console.error(error);
    }

    const questions = questionsMeta.map(q => q.title);
    const selectedTitle = await vscode.window.showQuickPick(questions, { canPickMany: false });
    const selectedQuestionMeta = questionsMeta.find(q => q.title === selectedTitle);
    const selectedQuestionUrl = selectedQuestionMeta ? selectedQuestionMeta.url : stackoverflowSearchUrl;
    if (selectedQuestionUrl) {
        opn(selectedQuestionUrl);
        // await openUrlInTab(selectedQuestionUrl, selectedQuestion!);
    }
}

// async function getExceptionDetails(): Promise<any> {
//     const session = vscode.debug.activeDebugSession;
//     if (!session) {
//         return;
//     }

//     try {
//         //const response = await session.customRequest('evaluate', { expression: 'args' });
//         const response = await session.customRequest('stackTrace', { threadId: 1 });
//         console.log(response);
//     } catch (error) {
//         console.log(error);
//     }

//     // const stackTrace = await session.customRequest('stackTrace', { threadId: 1 });
//     // const frameId = stackTrace.stackFrames[0].id;
//     // const response = await session.customRequest('evaluate', { expression: '$exception', frameId: frameId });
//     // const ex = response.result;
//     // console.log(ex);

//     // return ex;

//     return null;
// }

function getSelectedText(): string {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return '';
    }

    const document = editor.document;
    const eol = document.eol === 1 ? '\n' : '\r\n';
    let result: string = '';
    const selectedTextLines = editor.selections.map((selection) => {
        if (selection.start.line === selection.end.line && selection.start.character === selection.end.character) {
            const range = document.lineAt(selection.start).range;
            const text = editor.document.getText(range);
            return `${text}${eol}`;
        }

        return editor.document.getText(selection);
    });

    if (selectedTextLines.length > 0) {
        result = selectedTextLines[0];
    }

    result = result.trim();
    return result;
}

// async function downloadQuestionContent(url: string): Promise<string> {
//     var options = {
//         uri: url,
//     };

//     const result = await request.get(options);
//     return result;
// }

// async function openUrlInTab(url: string, tabTitle: string): Promise<void> {
//     const panel = vscode.window.createWebviewPanel(
//         'stackoverflow-search-question', // Identifies the type of the webview. Used internally
//         tabTitle,
//         vscode.ViewColumn.One,
//         {
//             enableScripts: true,
//             enableCommandUris: true,
//         }
//     );
//     const questionHtml = await downloadQuestionContent(url);
//     panel.webview.html = questionHtml;
// }