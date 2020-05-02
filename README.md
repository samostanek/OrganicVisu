# OrganicVisu
Visualisation of organic compounds by name.

## Usage
User opens index.html, draws compound name into the text field and clicks *Draw*.
## Supported structures
Currently supported chemical structures are:
  - Base string (metan, etan, propan, ..., oktan)
  - Alkyls (metyl, etyl, propyl, ..., oktyl)
  - Alcohols (metan-1-ol, etan-1-ol...)

These structures can be arbitrarly combined.
Implicit positioning (works metyletan as well as metyl-1-etan) is available only for alkyls.

## File structure
.
├── p5.js - p5 library
├── sketch.js - main script
├── constants.js - conversion between string and number encoding
├── carbon.js - contains `Yl` and `Carbon` classes
├── compound.js - contains `Compound` class
└── addons - currently not in use
    |── p5.sound.js

## Internal structure
Scripts are called in following order: `p5.js` -> `constants.js` -> `carbon.js` -> `compound.js` -> `sketch.js`.
Algorithm starts with function `drawCompound()@sketch.js`, which is called after user presses button. New Compound object is created.
### Compound class
Compound parses input string using the function Compound.parse(). Compound stores array of Carbon object - `Compound.base`.
### Carbon class
### Yl class
