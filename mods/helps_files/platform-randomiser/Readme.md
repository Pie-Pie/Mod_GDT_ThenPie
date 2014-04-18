# Platform Randomiser

Bored of the Playsystem 2 almost always being the right choice over the Gamesphere? Want to play a game where it was the TES that flopped? What would it be like if mature gamers flocked to the Gameling? This mod for Game Dev Tycoon randomises the success or failure of different consoles within the game. It can be configured to affect multiple aspects of a console's success including it's sales, lifespan, and what kind of audience it manages to attract.

![Menu](http://i.imgur.com/94C1qXM.png)

## Installation

The version number is 0.0.1 for a reason. While it will randomise your consoles, expect everything to be potentially broken. I'd advise not loading any important save files with the mod loaded, and instead disable the mod, restart the game, and then load your important save files. With that said, here you go:

1. Download [the mod from Bitbucket](https://bitbucket.org/tonyfinn/gdt-randomiser/downloads/platform-randomiser-0.0.2.zip) and unzip it inside your mods
directory for Game Dev Tycoon. 
2. Launch Game Dev Tycoon
3. Open the Mods menu.
4. Enable the mod API and this mod by clicking on them.
5. It is recommended you start a new game to use the randomiser, though it may work on existing save files.

## Mod compatibility

The randomiser should work with other mods which add new platforms, however compatibility is not guaranteed. When the mod is more complete, I will focus more on compatibility.

## Limitations

* The current version of the mod only randomises the stats of consoles, it doesn't do anything with the events associated with the consoles. This can cause issues where the game proclaims a console to be a huge success because the event to pop up the message still exists, whereas the randomiser actually turned the console into a huge flop.
* The above limitation applies to mods even more so.
* The current version is almost completely random, which means it can generate silly results like early consoles selling 2 million on launch day, or entire console generations failing. If you turn off the option to  exempt the PC from randomisation, then bad luck could leave you with no surviving consoles by the end of the game.

## Future Features

* More plausible generation, along with matching events. The default events announcing success or failure of a console will be removed and replaced with versions determined when the console is randomised. As well as that, an attempt will be made to simulate an evolution of a console so you can get consoles that launch poorly (due to a lack of games for example) but later become successful, or consoles that launch strong but don't follow it up. There will be matching events explaining these occurrences.
* Ability to write compatibility mods. This will allow people to write simple mods to allow their favourite mods to be randomised, or to have less variable results, for example by allowing them to declare which events are explaining console successes/failures and allowing them to be replaced, or writing console specific flavour text for different types of successes or failures.

## Known Bugs

* Later PC graphics are probably broken.

## Changelog

### 0.0.2

* Fix settings transferring between saves files.
* Fix wrong URL when attempting to open the mod site.

## License

Will probably be LGPL when I make my mind up. At the moment  though, all rights reserved, except for those granted to Green Heart Games through the modding agreement.
