import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Get active file path.
 * @returns The path to the active file.
 */
export function getActiveFilePath(): string | undefined {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        const filePath = activeEditor.document.uri.fsPath;
        return filePath;
    }
}

/**
 * Gets the path to MARS.
 * @returns The path to MARS jar file.
 */
export function getMarsPath(): string {
    let marsPath: string | undefined = vscode.workspace.getConfiguration("vscode-mips").get("marsPath");
    if (!marsPath) {
        let marsExtension = vscode.extensions.getExtension("triciopo.vscode-mips");
        marsPath = marsExtension ? marsExtension.extensionPath + "/mars.jar" : "";
        if (!fs.existsSync(marsPath)) {
            console.log(`MARS simulator not found. Please set the path to MARS in the settings.`);
        }
    }
    return marsPath;
}

/**
 * Gets the MARS terminal.
 * @returns The MARS terminal.
 */
export function getMarsTerminal(): vscode.Terminal {
    let terminal: vscode.Terminal | undefined = vscode.window.terminals.find(t => t.name === "MARS");
    if (!terminal) {
        return vscode.window.createTerminal("MARS");
    }
    return terminal;
}