# Sass BEM Gen

This extensions generates a Bem styled Sass file from HTML class names.

To use type the keybinding "alt+g alt+c" on an HTML file.

## Walk Through

1. Create an HTML file and fill out all desired class names.
2. Type the keybinding "alt+g alt+c" while on the HTML file.
3. Select either "Create scss file" or "Overwrite scss file" from the command palette drop down.

## Cool Features

  In the extension settings you can specify a list of default imports that are generated at the top of each CSS file.

## Configurations

(settings > extensions > Sass Bem Gen)

| Name                 | Options                   |
| -------------------- | ------------------------- |
| cssFlavor            | "scss", "sass", or "less" |
| separatingCharacter  | *string*                  |
| modifyingCharacter  | *string*                  |
| defaultImports       | *string[]* <br>*(ex. ```[ "_var.scss", "colors.scss" ]```)*               |

### Author

Created and sustained by Aaron Turkel (a.k.a. [The Holy Coder](https://github.com/AaronDovTurkel)).

#### Contributors

+ [Zushe Wilmowsky](https://zushewilmowsky.com)
+ Zevi Britz
+ David Genger
