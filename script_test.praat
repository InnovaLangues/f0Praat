
# this is a comment
# to execute this script run praat script_test.praat
# printline begin script!

# get param (praat script_test.praat test.wav)
form Get file url
    text fileName
endform

Read from file... 'fileName$'

To Pitch... 0.01 50 500

numberOfFrames = Get number of frames
for iframe to numberOfFrames
    time = Get time from frame: iframe
    pitch = Get value in frame: iframe, "Hertz"
    if pitch = undefined
       appendInfoLine: fixed$ (time, 6), ":", 0
    else
       appendInfoLine: fixed$ (time, 6), ":", fixed$ (pitch, 3)
    endif
    printline ;
endfor
