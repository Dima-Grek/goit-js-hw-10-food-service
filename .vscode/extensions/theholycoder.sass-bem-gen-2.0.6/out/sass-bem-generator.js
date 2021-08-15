"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genSubClass = (rootClass, classesTrimmed, separatingCharacter, modifyingCharacter) => {
    return Array.from(new Set(classesTrimmed
        .filter((classTrimmed) => classTrimmed.includes(rootClass))
        .map((classTrimmed) => {
        const splitClass = classTrimmed.split(separatingCharacter)[1];
        if (splitClass && includesOne(splitClass, modifyingCharacter)) {
            return splitClass.split(modifyingCharacter)[0];
        }
        else {
            return splitClass;
        }
    })
        .filter((subClass) => subClass)));
};
const genModifiers = (rootClass, classesTrimmed, modifyingCharacter, separatingCharacter, subclass = false, rootClasses) => {
    return Array.from(new Set(classesTrimmed
        .filter((classTrimmed) => {
        if (classTrimmed.includes(rootClass)) {
            let classHolder = classTrimmed.split(modifyingCharacter)[0] || classTrimmed;
            if (classHolder === rootClass) {
                return true;
            }
            else {
                return !rootClasses.some((root) => root === classHolder);
            }
        }
        else {
            return false;
        }
    })
        .map((classTrimmed) => {
        if (subclass) {
            return classTrimmed.split(modifyingCharacter)[1];
        }
        if (includesOne(classTrimmed, modifyingCharacter) && includesOne(classTrimmed, separatingCharacter)) {
            return;
        }
        else {
            return classTrimmed.split(modifyingCharacter)[1];
        }
    })
        .filter((subClass) => subClass)));
};
const genSassOutput = (rootClass, index, subClasses, separatingCharacter, rootClassModifiers, modifyingCharacter, subClassModifiers) => {
    return `

        .${rootClass} {
            ${subClasses[index].map((subClass, subClassIndex) => {
        return `
                    &${separatingCharacter}${subClass} {

                        ${subClassModifiers[index][subClassIndex].map((subClassModifier) => {
            return `
                                    &${modifyingCharacter}${subClassModifier} {
                                    }
                                `;
        })}
                    }
                `;
    })}
            ${rootClassModifiers[index].map((rootClassModifier) => {
        return `
                    &${modifyingCharacter}${rootClassModifier} {
                    }
                `;
    })}
        }
    `;
};
function includesOne(string, searchString) {
    const previousIncludedIndex = string.indexOf(searchString);
    if ((previousIncludedIndex > -1) && (string[previousIncludedIndex + searchString.length] !== searchString)) {
        return true;
    }
    else {
        return false;
    }
}
function sassBemGen(htmlString, separatingCharacter = "_", modifyingCharacter = "--") {
    const splitHtmlString = htmlString.split('class="').splice(1);
    const classesArray = splitHtmlString
        .map((string) => string.substring(0, string.indexOf('"')))
        .filter((c) => c);
    let classesTrimmed = classesArray.map((c) => [...c.split(" ")]).reduce((acc, val) => acc.concat(val), []);
    const rootClasses = Array.from(new Set(classesTrimmed.map((classTrimmed) => {
        let root;
        if (includesOne(classTrimmed, separatingCharacter)) {
            root = classTrimmed.split(separatingCharacter)[0];
        }
        else {
            root = classTrimmed;
        }
        if (includesOne(root, modifyingCharacter)) {
            return root.split(modifyingCharacter)[0];
        }
        else {
            return root;
        }
    })));
    const subClasses = rootClasses.map(r => genSubClass(r, classesTrimmed, separatingCharacter, modifyingCharacter));
    const rootClassModifiers = rootClasses.map(rootClass => {
        return genModifiers(rootClass, classesTrimmed, modifyingCharacter, separatingCharacter, false, rootClasses);
    });
    const subClassModifiers = subClasses.map(subClassArray => {
        return subClassArray.map(subClass => {
            return genModifiers(subClass, classesTrimmed, modifyingCharacter, separatingCharacter, true, rootClasses);
        });
    });
    ;
    const scssOutput = `${rootClasses.map((e, i) => genSassOutput(e, i, subClasses, separatingCharacter, rootClassModifiers, modifyingCharacter, subClassModifiers))}`.replace(/,/g, "");
    return scssOutput;
}
exports.sassBemGen = sassBemGen;
//# sourceMappingURL=sass-bem-generator.js.map