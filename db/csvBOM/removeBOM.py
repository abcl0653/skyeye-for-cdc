from os import listdir

filelist = listdir('.')

for filename in filelist:
    if filename[-4:] == '.csv':
        f = open(filename, mode='r', encoding='utf-8-sig')
        filecontent = f.read()
        f.close()

        f = open(filename, mode='w', encoding='utf-8')
        f.write(filecontent)
        f.close()