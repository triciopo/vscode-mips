import * as vscode from 'vscode';
import * as helpers from './helpers';

/**
 * Register extension commands.
 * @param context The extension context.
 */
export function registerCommands(context: vscode.ExtensionContext) {
    const marsPath: string = helpers.getMarsPath();

    let disposable = vscode.commands.registerCommand('vscode-mips.assembleExec', () => {
        const fileName = helpers.getActiveFilePath();
        let terminal = helpers.getMarsTerminal();

        // Assemble and execute
        terminal.sendText(`java -jar ${marsPath} ${fileName}`);
        terminal.show();
    });

    let assembleDisposable = vscode.commands.registerCommand('vscode-mips.assembleMips', () => {
        const fileName = helpers.getActiveFilePath();
        let terminal = helpers.getMarsTerminal();

        // Assemble but don't execute
        terminal.sendText(`java -jar ${marsPath} a ${fileName}`);
        terminal.show();
    });

    context.subscriptions.push(disposable, assembleDisposable);
}