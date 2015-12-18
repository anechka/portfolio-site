#! python
# -*- coding: utf-8 -*-
import os.path
import codecs

FILES_NEED_TO_PROCESSING = ("clients.html", "adminka.html")
RUSSIAN_TO_ENGLISH = {
    u"А": 'A', u"Б": 'B',
    u"В": 'V', u"Г": 'G',
    u"Д": 'D', u"Ё": 'Yo',
    u"Е": 'E', u"Ж": 'Zh',
    u"З": 'Z', u"Й": 'J',
    u"И": 'I', u"К": 'K',
    u"Л": 'L', u"М": 'M',
    u"Н": 'N', u"О": 'O',
    u"П": 'P', u"Р": 'R',
    u"С": 'S', u"Т": 'T',
    u"У": 'U', u"Ф": 'F',
    u"Х": 'H', u"Ц": 'Z',
    u"Ч": 'Ch', u"Ш": 'Sh',
    u"Щ": 'Sch', u"Ъ": '',
    u"Ь": '', u"Ы": 'i',
    u"Э": 'E',
    u"Ю": 'Yu', u"Я": 'Ya'
}

for html_filename in FILES_NEED_TO_PROCESSING:
    if os.path.isfile(html_filename):
        print "ok... processing %s" % html_filename

        english_html_file = html_filename.split(".")[0] + "_en" + ".html"

        #with open(html_filename) as html_source_file:
        with codecs.open(html_filename, "r", "utf-8") as html_source_file:
            #html_source_file.seek(4700)
            byte = unicode()

            with codecs.open(english_html_file, "w", "utf-8") as file_dest:

                while True:
                    byte = html_source_file.read(1)
                    if not byte:
                        print "Completed"
                        break
                    byte_capital = byte.capitalize()

                    if byte == byte_capital:
                        # Работаем с заглавной буквой
                        if byte in RUSSIAN_TO_ENGLISH.keys():
                            file_dest.write(RUSSIAN_TO_ENGLISH[byte])
                        else:
                            file_dest.write(byte)
                    else:
                        # Работаем с малой буквой
                        if byte_capital in RUSSIAN_TO_ENGLISH.keys():
                            file_dest.write(RUSSIAN_TO_ENGLISH[byte_capital].lower())
                        else:
                              file_dest.write(byte)