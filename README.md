# lemonade
An operationally and visually faithful replica of Apple's 1979 game Lemonade Stand in JavaScript

Some day I may write a 1,000 page horror novel called _The Stand_ about my experiences porting Lemonade Stand from Applesoft BASIC to asynchronous JavaScript.

Seriously though, I didn't have an Apple as a kid, although I used one at school sometimes to learn a now-dead language called LOGO.  I mainly did this project as a learning experience to get familiar with Applesoft BASIC so I could port a few things I liked a lot more, such as Oregon Trail and Akalabeth, so look for those in the years to come.

The core of this game is a RequireJS compliant library called Screen that partly implements the TEXT and GR (lo-res graphics) modes, and offers a number of functions from the Applesoft BASIC such as HOME, VTAB, HTAB, PRINT, INPUT, and GET, and COLOR, PLOT, HLIN, and VLIN in the lo-res graphical mode.

There is undoubtedly a more efficient way to port the game, even if one wanted to be visually faithful, but as I said I did it this way to better understand the order of operations and processes in the original code.

Ideally, to complete the faithful port, I would like to have a library called Speaker to go with the Screen library, that could play musical notes.  However, the original Apple II way is so obscure that it would not be a good idea to mimic the original commands, which have a lot of DATA, RESTORE, PEEK, and POKE commands that are not documented in a beginner book on Applesoft BASIC, and certainly not documented in the original Lemonade Stand code.  I also don't know how to read musical sheets.  If anyone would love to create a super simple musical note player for me, I would love to collaborate with you.
