import * as vscode from 'vscode';
import * as commands from './commands';

export function activate(context: vscode.ExtensionContext) {
    commands.registerCommands(context);
}

export function deactivate() {}
