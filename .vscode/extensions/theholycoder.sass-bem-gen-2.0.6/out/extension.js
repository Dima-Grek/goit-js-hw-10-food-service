"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const sass_bem_generator_1 = require("./sass-bem-generator");
const vscode_1 = require("vscode");
function activate(context) {
    console.log('Congratulations, your extension "sass-bem-gen" is now active!');
    let disposable = vscode.commands.registerCommand('sass-bem-gen.generateBem', () => {
        var _a;
        const editor = vscode.window.activeTextEditor;
        const wsEdit = new vscode.WorkspaceEdit();
        const workSpace = vscode.workspace;
        const htmlFileName = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri;
        const cssFlavor = workSpace.getConfiguration("sass-bem-gen").get("cssFlavor");
        const separatingCharacter = workSpace.getConfiguration("sass-bem-gen").get("separatingCharacter");
        const modifyingCharacter = workSpace.getConfiguration("sass-bem-gen").get("modifyingCharacter");
        const defaultImports = workSpace.getConfiguration("sass-bem-gen").get("defaultImports").map(importName => `@import "${importName}";`).join(", ");
        if (htmlFileName && editor) {
            let sassOutput;
            if (editor.document.getText()) {
                sassOutput = defaultImports + sass_bem_generator_1.sassBemGen(editor.document.getText(), separatingCharacter, modifyingCharacter);
            }
            const folder = htmlFileName.path.split("/");
            const uriFolder = vscode.Uri.file(folder.slice(0, folder.length - 1).join("/"));
            const relativePath = new vscode_1.RelativePattern(uriFolder.path, `**/*.${cssFlavor}`);
            const scssFile = vscode.Uri.file(htmlFileName.path.replace(".html", `.${cssFlavor}`));
            return workSpace.findFiles(relativePath).then(scssFiles => {
                if (scssFiles.length) {
                    vscode.window.showQuickPick([`Overwrite ${cssFlavor} file`, "Cancel"]).then(option => {
                        if (option === `Overwrite ${cssFlavor} file`) {
                            const deleteFileEdit = new vscode.WorkspaceEdit();
                            deleteFileEdit.deleteFile(scssFile);
                            vscode.workspace.applyEdit(deleteFileEdit).then(() => {
                                const createFileEdit = new vscode.WorkspaceEdit();
                                createFileEdit.createFile(scssFile);
                                createFileEdit.insert(scssFile, new vscode.Position(0, 0), sassOutput);
                                vscode.workspace.applyEdit(createFileEdit).then(() => {
                                    vscode_1.commands.executeCommand("vscode.executeFormatDocumentProvider", scssFile, editor.options).then((edits) => {
                                        if (edits) {
                                            const cssFormatEdit = new vscode.WorkspaceEdit();
                                            cssFormatEdit.set(scssFile, edits);
                                            vscode.workspace.applyEdit(cssFormatEdit).then(() => {
                                                vscode.workspace.saveAll();
                                            });
                                        }
                                        vscode_1.commands.executeCommand('vscode.openFolder', scssFile);
                                    });
                                });
                            });
                        }
                        else {
                            vscode.window.showInformationMessage("Your operation was cancelled.");
                        }
                    });
                }
                else {
                    vscode.window.showQuickPick([`Create ${cssFlavor} file`, "Cancel"]).then(option => {
                        if (option === `Create ${cssFlavor} file`) {
                            const createFileEdit = new vscode.WorkspaceEdit();
                            createFileEdit.createFile(scssFile);
                            createFileEdit.insert(scssFile, new vscode.Position(0, 0), sassOutput);
                            vscode.workspace.applyEdit(createFileEdit).then(() => {
                                vscode_1.commands.executeCommand("vscode.executeFormatDocumentProvider", scssFile, editor.options).then((edits) => {
                                    if (edits) {
                                        const cssFormatEdit = new vscode.WorkspaceEdit();
                                        cssFormatEdit.set(scssFile, edits);
                                        vscode.workspace.applyEdit(cssFormatEdit).then(() => {
                                            vscode.workspace.saveAll();
                                        });
                                    }
                                    vscode_1.commands.executeCommand('vscode.openFolder', scssFile);
                                });
                            });
                        }
                        else {
                            vscode.window.showInformationMessage("Your operation was cancelled.");
                        }
                    });
                }
            });
        }
        else {
            vscode.window.showInformationMessage("Cannot find workspace.");
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map