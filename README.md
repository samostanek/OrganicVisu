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

## Internata structure
Scripts are called in following order: `p5.js` -> `constants.js` -> `carbon.js` -> `compound.js` -> `sketch.js`.
