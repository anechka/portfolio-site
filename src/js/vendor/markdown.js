/**
 * Created by menangen on 14.07.17.
 */
export default function (src)
{
    let str='';

    function inlineReplace(s)
    {
        return s
            .replace(/\^/g, '<br/>')// Break line tag
            .replace(/!\[([^\]]*)]\(([^(]+)\)/g, '<img alt="$1" title="$1" src="$2">')
            .replace(/\[([^\]]+)]\(([^(]+)\)/g, `<a target="_blank" href="${'$2'}">${'$1'}</a>`)
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            .replace(/!([^*]+)!/g, '<kbd>$1</kbd>');
    }

    src
        .replace(/>>/g, '\n')// New Paragraph
        .replace(/^\s+|\r|\s+$/g, '')
        .replace(/\t/g, '    ')
        .replace(/=/g, '<br />')
        .split(/\n\n+/)
        .forEach(function(value, index, splittedArrayLines)
        {
            let firstSymbol=value[0];
            splittedArrayLines=
                {
                    '*':[/\n\* /,'<ul><li>','</li></ul>'],
                    '1':[/\n[1-9]\d*\.? /,'<ol><li>','</li></ol>'],
                    ' ':[/\n    /,'<pre><code>','</pre></code>','\n'],
                    '>':[/\n> /,'<blockquote>','</blockquote>','\n']
                }[firstSymbol];
            str+=
                splittedArrayLines
                    ?
                    splittedArrayLines[1]+('\n'+value)
                        .split(splittedArrayLines[0])
                        .slice(1)
                        .map(inlineReplace)
                        .join(splittedArrayLines[3]||'</li>\n<li>')+splittedArrayLines[2]
                    :
                        firstSymbol === '#' ?
                            `<h${firstSymbol=value.indexOf(' ')}>${inlineReplace(value.slice(firstSymbol+1))}</h${firstSymbol}>`
                            :
                        firstSymbol === '<' ? value : `<p>${inlineReplace(value)}</p>`;
        });
    return str;
};