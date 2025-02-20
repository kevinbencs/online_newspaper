export function chooseTypeOfTextItemSearch(s: string) {
    let res: string = '';
    if (s.indexOf('<Image') === 0) { res = createImg(s) }
    else if (s.indexOf('<ul>') === 0) { res = createList(s) }
    else if (s.indexOf('<video') === 0) { res = createVideo(s) }
    else if (s.indexOf('<youtube') === 0) { res = createYoutube(s) }
    else if (s.indexOf('<X') === 0) { res = createX(s) }
    else if (s.indexOf('<facebook') === 0) { res = createFacebook(s) }
    else if (s.indexOf('<instagram') === 0) { res = createInstagram(s) }
    else if (s.indexOf('<linkedin') === 0) { res = createLinkedin(s) }
    else if (s.indexOf('<tiktok') === 0) { res = createTiktok(s) }
    else if (s.indexOf('<pinterest') === 0) { res = createPinterest(s) }
    else if (s.indexOf('<title>') === 0) { res = createTitlte(s) }
    else if (s.indexOf('<highlight>') === 0) { res = createHighlight(s) }
    else if (s.indexOf('<audio') === 0) { res = createAudio(s) }
    else { res = jsxInText(s); }

    return res;
}


const jsxInText = (s: string) => {
    let index1: number = 0
    let index2: number = s.indexOf('<')
    let result: string = '';

    const textArray: string[] = [];

    while (index2 > -1) {


        if (s.indexOf('<Link', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createLink(s.slice(index2, s.indexOf('</Link>', index2) + 7));


            textArray.push(result);
            index1 = s.indexOf('</Link>', index2) + 7;
            index2 = s.indexOf('<', index1);

        }
        else if (s.indexOf('<anchor', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createAnchor(s.slice(index2, s.indexOf('</anchor_link>', index2) + 14));

            textArray.push(result);
            index1 = s.indexOf('</anchor_link>', index2) + 14;
            index2 = s.indexOf('<', index1);


        }
        else if (s.indexOf('<bold', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createStrong(s.slice(index2, s.indexOf('</bold>', index2) + 7));

            textArray.push(result);
            index1 = s.indexOf('</bold>', index2) + 7;
            index2 = s.indexOf('<', index1);


        }
        else if (s.indexOf('<italic', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createEm(s.slice(index2, s.indexOf('</italic', index2) + 9));

            textArray.push(result);
            index1 = s.indexOf('</italic', index2) + 9;
            index2 = s.indexOf('<', index1);


        }

    }

    textArray.push(s.slice(index1, s.length));

    return textArray.join(' ')
}


const createLink = (s: string) => {
    const indexHrefEnd: number = s.indexOf(')');
    const indexTextEnd: number = s.indexOf('</Link', 1);

    const textArray: string[] = [];
    const text = s.slice(indexHrefEnd + 2, indexTextEnd);
    let index1: number = 0
    let index3: number = text.indexOf('<');
    let result: string = '';

    while (index3 > -1) {
        if (text.indexOf('<italic') === index3 && index3 > -1) {

            textArray.push(text.slice(index1, index3));
            result = createEm(text.slice(index3, text.indexOf('</italic>', index3) + 9));

            textArray.push(result);
            index1 = text.indexOf('</italic', index3) + 9;
            index3 = text.indexOf('<', index1);

        }
        else if (text.indexOf('<bold') === index3 && index3 > -1) {
            textArray.push(text.slice(index1, index3));
            result = createStrong(text.slice(index3, text.indexOf('</bold>', index3) + 7));

            textArray.push(result);
            index1 = text.indexOf('</bold>', index3) + 7;
            index3 = text.indexOf('<', index1);
        }
    }


    textArray.push(text.slice(index1, text.length))

    return textArray.join(' ')

}

const createAnchor = (s: string) => {
    const indexHrefEnd: number = s.indexOf(')');
    const indexTextEnd: number = s.indexOf('</anchor', 1);


    const textArray: string[] = [];
    const text = s.slice(indexHrefEnd + 2, indexTextEnd);
    let index1: number = 0
    let index3: number = text.indexOf('<');
    let result: string = '';

    while (index3 > -1) {

        if (text.indexOf('<italic') === index3 && index3 > -1) {

            textArray.push(text.slice(index1, index3));
            result = createEm(text.slice(index3, text.indexOf('</italic>', index3) + 9));

            textArray.push(result);
            index1 = text.indexOf('</italic', index3) + 9;
            index3 = text.indexOf('<', index1);

        }
        else if (text.indexOf('<bold') === index3 && index3 > -1) {
            textArray.push(text.slice(index1, index3));
            result = createStrong(text.slice(index3, text.indexOf('</bold>', index3) + 7));

            textArray.push(result);
            index1 = text.indexOf('</bold>', index3) + 7;
            index3 = text.indexOf('<', index1);
        }
    }

    textArray.push(text.slice(index1, text.length))

    return textArray.join(' ')
}


const createStrong = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</bold', 1);


    const text = s.slice(indexHrefEnd + 1, indexTextEnd);
    const textArray: string[] = [];
    let index1: number = 0
    let index3: number = text.indexOf('<');
    let result: string = '';

    while (index3 > -1) {
        if (text.indexOf('<italic') === index3 && index3 > -1) {

            textArray.push(text.slice(index1, index3));
            result = createEmText(text.slice(index3, text.indexOf('</italic>', index3) + 9));

            textArray.push(result);
            index1 = text.indexOf('</italic>', index3) + 9;
            index3 = text.indexOf('<', index1);

        }
    }

    textArray.push(text.slice(index1, text.length))

    return textArray.join(' ')
}


const createStrongText = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</bold', 1);

    const text = s.slice(indexHrefEnd + 1, indexTextEnd);
    return text
}



const createEm = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</italic');

    const text = s.slice(indexHrefEnd + 1, indexTextEnd);

    let index1: number = 0
    let index3: number = text.indexOf('<');
    let result: string = ''

    const textArray: string[] = [];

    while (index3 > -1) {
        if (text.indexOf('<bold') === index3 && index3 > -1) {
            textArray.push(text.slice(index1, index3));
            result = createStrongText(text.slice(index3, text.indexOf('</bold>', index3) + 7));

            textArray.push(result);
            index1 = text.indexOf('</bold>', index3) + 7;
            index3 = text.indexOf('<', index1);
        }
    }
    return textArray.join(" ")
}


const createEmText = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</italic');

    const text = s.slice(indexHrefEnd + 1, indexTextEnd);

    return text
}



const createImg = (s: string) => {
    return ''
}

const createVideo = (s: string) => {
    return ''
}


const createYoutube = (s: string) => {
    return ''
}


const createX = (s: string) => {
    return ''
}

const createInstagram = (s: string) => {
    return ''
}

const createFacebook = (s: string) => {
    return ''
}

const createTiktok = (s: string) => {
    return ''
}

const createPinterest = (s: string) => {
    return ''
}

const createLinkedin = (s: string) => {
    return ''
}


const createAudio = (s: string) => {
    return ''
}


const createList = (s: string) => {
    const index1 = s.indexOf('<ul>');
    const index2 = s.indexOf('</ul>');

    const List = s.slice(index1 + 4, index2);



    return List.split('<list>').map(item => jsxInText(item)).join(' ')
}

const createTitlte = (s: string) => {
    const index1 = s.indexOf('<title>');
    const index2 = s.indexOf('</title>');

    const title = s.slice(7, index2);

    return title
}

const createHighlight = (s: string) => {
    const index1 = s.indexOf('<highlight>');
    const index2 = s.indexOf('</highlight>');

    const text = s.slice(11, index2);

    return text
}


