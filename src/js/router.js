const showCounterTextForTag = (route) => {
    console.info(`showCounterTextForTag ${route}`);
};

const displayTaggedProjects = (route) => {
    console.info(`displayTaggedProjects ${route}`);
};

export default function() {
    const trailingSlashRE = /([\/#])+/i;

    if (location.hasOwnProperty("hash")) {
        const hash = location.hash || '';
        console.info(`hash is ${hash}`);

        const word = hash.replace(trailingSlashRE, '').toLowerCase();
        console.log(`replaced = ${word}`);

        showCounterTextForTag(word);
        displayTaggedProjects(word);
    }
}